'use client';

import React, { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DailyInputForm from "@/components/DailyInputForm"
import Dashboard from "@/components/Dashboard"
import ProspectManagement from "@/components/ProspectManagement"
import PersonalDashboard from "@/components/PersonalDashboard"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">営業管理システム</h1>
        
        <Suspense fallback={<div>Loading...</div>}>
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard">全体ダッシュボード</TabsTrigger>
              <TabsTrigger value="personal">担当者別</TabsTrigger>
              <TabsTrigger value="daily-input">日次入力</TabsTrigger>
              <TabsTrigger value="prospects">案件管理</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <Dashboard />
            </TabsContent>

            <TabsContent value="personal">
              <PersonalDashboard />
            </TabsContent>

            <TabsContent value="daily-input">
              <DailyInputForm />
            </TabsContent>

            <TabsContent value="prospects">
              <ProspectManagement />
            </TabsContent>
          </Tabs>
        </Suspense>
      </div>
    </div>
  )
} 