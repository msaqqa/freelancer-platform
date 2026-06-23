'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth/use-auth';
import { ScreenLoader } from '@/components/common/screen-loader';

export default function ProtectedLayout({ children }) {
  const { data: user, isLoading, isError } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (!user || isError) {
      router.push('/signin');
      return;
    }

    // حالة المستخدم الجديد: لا يوجد نوع حساب بعد
    if (!user.type) {
      if (!pathname.startsWith('/new-user/account-type')) {
        router.push('/new-user/account-type');
      }
      return;
    }

    // حالة المستخدم الجديد: تم اختيار النوع لكن لم يملأ البيانات المطلوبة
    if (user.type && !user.save_data) {
      if (!pathname.startsWith('/new-user/required-data')) {
        router.push('/new-user/required-data');
      }
      return;
    }

    // المستخدم قد انتهى من التسجيل بالكامل: نوجهه حسب نوعه
    if (user.type && user.save_data) {
      const userDashboard = `/${user.type}`;
      
      // إذا كان في الداشبورد الصحيح: لا نعيد توجيه
      if (pathname.startsWith(userDashboard)) {
        return;
      }

      // إذا كان في مجلد new-user لكنه قد انتهى: نوجهه للداشبورد
      if (pathname.startsWith('/new-user')) {
        router.push(userDashboard);
        return;
      }

      // أي مسار آخر: نوجهه للداشبورد الخاص بنوعه
      router.push(userDashboard);
      return;
    }
  }, [isLoading, user, isError, pathname, router]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return children;
}
