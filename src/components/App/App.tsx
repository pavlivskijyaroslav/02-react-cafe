import { useState } from 'react';

import css from './App.module.css';

import CafeInfo from '../CafeInfo/Cafeinfo.tsx';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import Notification from '../Notification/Notification.tsx';

import type { Votes, VoteType } from '../../types/votes.ts';
import VoteStats from '../VoteStats/VoteStats.tsx';

const initialVotes: Votes = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [votes, setVotes] = useState<Votes>(initialVotes);
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  const handleVote = (type: VoteType) => {
    setVotes((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
  };
  const resetVotes = () => {
    setVotes(initialVotes);
  };

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0 ? true : false}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
