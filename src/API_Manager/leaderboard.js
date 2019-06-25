const url = "http://localhost:8088/leaderboard";

export const getLeaderboard = () => {
    return fetch(url).then(res => res.json());
}

export const saveScore = scoreOBJ => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(scoreOBJ)
    });
  };