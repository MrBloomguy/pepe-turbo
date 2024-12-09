import { useState } from 'react';
import styles from "../styles/Leaderboard.module.css";

export default function Leaderboard() {
  const [activeProfile, setActiveProfile] = useState(null);

  const leaderboardData = [
    {
      id: 1,
      rank: 1,
      username: "CryptoKing",
      wins: 156,
      winRate: "78%",
      volume: "125,000 USDT"
    },
    {
      id: 2,
      rank: 2,
      username: "TraderPro",
      wins: 142,
      winRate: "71%",
      volume: "98,000 USDT"
    },
    {
      id: 3,
      rank: 3,
      username: "SolWarrior",
      wins: 134,
      winRate: "67%",
      volume: "87,500 USDT"
    },
    {
      id: 4,
      rank: 4,
      username: "EtherWhale",
      wins: 128,
      winRate: "64%",
      volume: "76,000 USDT"
    },
    {
      id: 5,
      rank: 5,
      username: "BetMaster",
      wins: 120,
      winRate: "60%",
      volume: "65,000 USDT"
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>User</th>
                  <th>Wins</th>
                  <th>Win Rate</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user) => (
                  <tr key={user.id} className={styles.leaderboardRow}>
                    <td>
                      <div className={styles.rankCell}>
                        #{user.rank}
                      </div>
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar}></div>
                        <span className={styles.username}>{user.username}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.winsCell}>
                        {user.wins}
                      </div>
                    </td>
                    <td>
                      <div className={styles.winRateCell}>
                        {user.winRate}
                      </div>
                    </td>
                    <td>
                      <div className={styles.volumeCell}>
                        {user.volume}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 