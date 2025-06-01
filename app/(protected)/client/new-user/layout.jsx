import { redirect } from 'next/navigation';

function Freelancerlayout({ children }) {
  const role = 'freelancer';
  if (role !== 'freelancer') {
    redirect('/signin');
  }
  return children;
}

export default Freelancerlayout;
