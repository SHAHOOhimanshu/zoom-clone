'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import Alert from '@/components/Alert';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';

const MeetingPage = () => {
  const params = useParams();
  const { isLoaded, user } = useUser();
  
  // Validate and extract 'id'
  const id = typeof params?.id === 'string' ? params.id : null;

  // Ensure id is a valid string before calling useGetCallById
  const { call, isCallLoading } = useGetCallById(id ?? '');

  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Loader during initial states
  if (!isLoaded || isCallLoading) return <Loader />;

  // Handle case when call is not found
  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );
  }

  // Check if user is allowed to join the call
  const notAllowed =
    call.type === 'invited' &&
    (!user || !call.state.members.some((m) => m.user.id === user.id));

  if (notAllowed) {
    return <Alert title="You are not allowed to join this meeting" />;
  }

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;
