// シート名の定数
const SHEET_NAMES = {
  SALESPERSONS: '営業担当者',
  PROSPECTS: '案件管理',
  DAILY_ACTIVITIES: '日次活動'
};

// シートのカラム定義
const COLUMNS = {
  SALESPERSONS: ['id', 'name', 'email', 'created_at', 'updated_at'],
  PROSPECTS: ['id', 'company', 'contact', 'email', 'status', 'notes', 'salesperson_id', 'created_at', 'updated_at'],
  DAILY_ACTIVITIES: ['id', 'date', 'salesperson_id', 'approaches', 'appointments', 'meetings', 'trials', 'contracts', 'created_at', 'updated_at']
};

// レスポンスヘッダーの設定
function setResponseHeaders(output) {
  return output
    .setHeader('Access-Control-Allow-Origin', 'https://nobutan97.github.io')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

// 共通のユーティリティ関数
function getSheet(sheetName) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

function createResponse(success, data = null, error = null) {
  const response = { success };
  if (data !== null) response.data = data;
  if (error !== null) response.error = error;
  
  return setResponseHeaders(
    ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON)
  );
}

function getSheetData(sheet) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      // 数値型の場合は数値として返す
      if (['approaches', 'appointments', 'meetings', 'trials', 'contracts'].includes(header)) {
        obj[header] = Number(row[index]);
      } else {
        obj[header] = row[index];
      }
    });
    return obj;
  });
}

function findRowById(sheet, id) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === id) {
      return i + 1; // 1-based index for sheets
    }
  }
  return null;
}

// OPTIONSリクエストのハンドラー（CORS対応）
function doOptions(e) {
  return setResponseHeaders(ContentService.createTextOutput(''));
}

// GETリクエストのハンドラー
function doGet(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(30000)) {
      throw new Error('ロックの取得に失敗しました');
    }

    // 全てのデータを取得
    const salespersonsSheet = getSheet(SHEET_NAMES.SALESPERSONS);
    const prospectsSheet = getSheet(SHEET_NAMES.PROSPECTS);
    const activitiesSheet = getSheet(SHEET_NAMES.DAILY_ACTIVITIES);

    const data = {
      salespersons: getSheetData(salespersonsSheet),
      prospects: getSheetData(prospectsSheet),
      activities: getSheetData(activitiesSheet)
    };

    return createResponse(true, data);
  } catch (error) {
    console.error('GET Error:', error);
    return createResponse(false, null, error.toString());
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

// POSTリクエストのハンドラー
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    if (!lock.tryLock(30000)) {
      throw new Error('ロックの取得に失敗しました');
    }

    if (!e.postData || !e.postData.contents) {
      throw new Error('リクエストデータが不正です');
    }

    const request = JSON.parse(e.postData.contents);
    const { action, data } = request;
    const now = new Date().toISOString();

    // 営業担当者の操作
    if (action === 'addSalesperson') {
      const sheet = getSheet(SHEET_NAMES.SALESPERSONS);
      const id = Utilities.getUuid();
      sheet.appendRow([
        id,
        data.name,
        data.email || '',
        now,
        now
      ]);
      return createResponse(true, { id, name: data.name });
    }

    if (action === 'updateSalesperson') {
      const sheet = getSheet(SHEET_NAMES.SALESPERSONS);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('営業担当者が見つかりません');

      sheet.getRange(rowNum, 2, 1, 3).setValues([[
        data.name,
        data.email || '',
        now
      ]]);
      return createResponse(true, { id: data.id });
    }

    if (action === 'deleteSalesperson') {
      const sheet = getSheet(SHEET_NAMES.SALESPERSONS);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('営業担当者が見つかりません');

      sheet.deleteRow(rowNum);
      return createResponse(true);
    }

    // 案件の操作
    if (action === 'addProspect') {
      const sheet = getSheet(SHEET_NAMES.PROSPECTS);
      const id = Utilities.getUuid();
      sheet.appendRow([
        id,
        data.company,
        data.contact || '',
        data.email || '',
        data.status || '新規',
        data.notes || '',
        data.salesperson_id,
        now,
        now
      ]);
      return createResponse(true, { id });
    }

    if (action === 'updateProspect') {
      const sheet = getSheet(SHEET_NAMES.PROSPECTS);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('案件が見つかりません');

      sheet.getRange(rowNum, 2, 1, 7).setValues([[
        data.company,
        data.contact || '',
        data.email || '',
        data.status || '新規',
        data.notes || '',
        data.salesperson_id,
        now
      ]]);
      return createResponse(true, { id: data.id });
    }

    if (action === 'deleteProspect') {
      const sheet = getSheet(SHEET_NAMES.PROSPECTS);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('案件が見つかりません');

      sheet.deleteRow(rowNum);
      return createResponse(true);
    }

    // 日次活動の操作
    if (action === 'addActivity') {
      const sheet = getSheet(SHEET_NAMES.DAILY_ACTIVITIES);
      const id = Utilities.getUuid();
      sheet.appendRow([
        id,
        data.date,
        data.salesperson_id,
        data.approaches || 0,
        data.appointments || 0,
        data.meetings || 0,
        data.trials || 0,
        data.contracts || 0,
        now,
        now
      ]);
      return createResponse(true, { id });
    }

    if (action === 'updateActivity') {
      const sheet = getSheet(SHEET_NAMES.DAILY_ACTIVITIES);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('活動記録が見つかりません');

      sheet.getRange(rowNum, 2, 1, 8).setValues([[
        data.date,
        data.salesperson_id,
        data.approaches || 0,
        data.appointments || 0,
        data.meetings || 0,
        data.trials || 0,
        data.contracts || 0,
        now
      ]]);
      return createResponse(true, { id: data.id });
    }

    if (action === 'deleteActivity') {
      const sheet = getSheet(SHEET_NAMES.DAILY_ACTIVITIES);
      const rowNum = findRowById(sheet, data.id);
      if (!rowNum) throw new Error('活動記録が見つかりません');

      sheet.deleteRow(rowNum);
      return createResponse(true);
    }

    throw new Error('不正なアクションです');
  } catch (error) {
    console.error('POST Error:', error);
    return createResponse(false, null, error.toString());
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
} 