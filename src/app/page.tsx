import SalespersonList from '@/components/SalespersonList';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">営業管理システム</h1>
        <SalespersonList />
      </div>
    </main>
  );
} 