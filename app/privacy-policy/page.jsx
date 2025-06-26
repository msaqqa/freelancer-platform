'use client';

import React, { useEffect, useState } from 'react';
import { getPrivacyPolicy } from '@/services/general';
import { Container } from '@/components/common/container';

function PrivacyPolicy() {
  const [privacyPolicyData, setPrivacyPolicyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const res = await getPrivacyPolicy();
        if (res && res.data) {
          setPrivacyPolicyData(res.data);
        } else {
          setError('No data returned');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center" style={{ flexGrow: '1' }}>
      <Container className="pt-13">
        <h1 className="text-center mb-8">Privacy Policy</h1>
        <div dangerouslySetInnerHTML={{ __html: privacyPolicyData }} />
      </Container>
    </div>
  );
}

export default PrivacyPolicy;
