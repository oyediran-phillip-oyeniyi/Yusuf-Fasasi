import { Suspense } from 'react';
import CoinsTable from '@/components/CoinsTable';
import CoinsTableFallback from '@/components/CoinsTableFallback';

interface CoinsPageProps {
  searchParams: { page?: string };
}

const CoinsPage = async ({ searchParams }: CoinsPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <main id="coins-page">
      <div className="content">
        <h4>All Coins</h4>

        <Suspense key={currentPage} fallback={<CoinsTableFallback />}>
          <CoinsTable currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
};

export default CoinsPage;