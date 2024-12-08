"use client"

import { useState } from "react"

import styles from "../styles/Activities.module.css"

export default function Activities() {
  const [activeProfile, setActiveProfile] = useState(null)

  const activities = [
    {
      id: 1,
      challenger: "CryptoKing",
      opponent: "BetMaster",
      challenge: "World Cup Final Winner",
      date: "2024-03-20",
      time: "14:00",
      volume: "5,000 USDT",
    },
    {
      id: 2,
      challenger: "TraderPro",
      opponent: "CryptoNinja",
      challenge: "BTC reaches 100k",
      date: "2024-04-15",
      time: "16:00",
      volume: "10,000 USDT",
    },
    {
      id: 3,
      challenger: "SolWarrior",
      opponent: "ChainMaster",
      challenge: "SOL to hit $500",
      date: "2024-05-01",
      time: "12:00",
      volume: "2,500 USDT",
    },
    {
      id: 4,
      challenger: "PolyKing",
      opponent: "ScalingPro",
      challenge: "Daily TX over 100M",
      date: "2024-06-10",
      time: "15:30",
      volume: "7,500 USDT",
    },
    {
      id: 5,
      challenger: "EtherWhale",
      opponent: "GasTracker",
      challenge: "Gas below 20 gwei",
      date: "2024-07-20",
      time: "09:45",
      volume: "15,000 USDT",
    },
  ]

  return (
    <div className={styles.pageContainer}>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Challenge</th>
                  <th>Date</th>
                  <th>Volume</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id} className={styles.challengeRow}>
                    <td>
                      <div className={styles.usersCell}>
                        <div className={styles.avatarStack}>
                          <div className={styles.avatarTop}></div>
                          <div className={styles.avatarBottom}></div>
                        </div>
                        <div className={styles.userNames}>
                          <span className={styles.challenger}>
                            {activity.challenger}
                          </span>
                          <span> vs </span>
                          <span className={styles.opponent}>
                            {activity.opponent}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.challengeCell}>
                        {activity.challenge}
                      </div>
                    </td>
                    <td>
                      <div className={styles.dateCell}>
                        <div className={styles.dateInfo}>
                          <span>{activity.date}</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.volumeCell}>{activity.volume}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
