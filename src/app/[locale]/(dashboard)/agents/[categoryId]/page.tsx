import PageContainer from '@/components/layout/page-container';
import { aiAgentsCategories } from '@/constants/data';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params
}: {
  params: Promise<{ categoryId: string; locale: string }>;
}) {
  const { categoryId } = await params;

  const category = aiAgentsCategories.find(
    (cat) => cat.name === categoryId || cat.id.toString() === categoryId
  );

  if (!category) {
    notFound();
  }

  return (
    <PageContainer>
      <div className='flex items-center justify-between space-y-2 pt-16'>
        <h1 className='text-2xl font-bold capitalize'>
          {category.name.replace('-', ' ')}
        </h1>
        <p className='text-muted-foreground'>{category.description}</p>
      </div>
    </PageContainer>
  );
}
