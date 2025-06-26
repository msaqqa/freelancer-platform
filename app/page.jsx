import { redirect } from 'next/navigation';

function page() {
  redirect('/signin');
}

export default page;
