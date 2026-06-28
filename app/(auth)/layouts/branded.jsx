import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import { MinimalFooter } from '@/components/layouts/minimal-footer';
import { MinimalHeader } from '@/components/layouts/minimal-header';

export function BrandedLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <style>
        {`
          .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1.png')}');
          }
          .dark .branded-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1600/1-dark.png')}');
          }
        `}
      </style>

      <MinimalHeader />

      <main className="flex-grow flex items-center justify-center py-10">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex justify-center items-center order-2 lg:order-1">
            <Card className="w-full max-w-[450px] shadow-lg border-border/40">
              <CardContent className="p-8">{children}</CardContent>
            </Card>
          </div>

          <div className="hidden lg:block lg:rounded-2xl lg:border lg:border-border/50 h-[600px] order-1 lg:order-2 bg-top xxl:bg-center xl:bg-cover bg-no-repeat branded-bg bg-cover shadow-xl"></div>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}
