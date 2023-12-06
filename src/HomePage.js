import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './home_styles.css';

const HomePage = () => {
    const [games, setGames] = useState([]);
    const [week, setWeek] = useState(null);

    let curWeek = 14

    useEffect(() => {
        const parseCSV = async (fileName, setStateFunction) => {
          try {
            const response = await fetch(`/csv/${fileName}.csv`);
            if (!response.ok) {
              throw new Error(`Failed to fetch CSV: ${response.statusText}`);
            }
    
            const text = await response.text();
            const parsed = Papa.parse(text, { header: true }).data;
            setStateFunction(parsed);
    
            const uniqueWeeks = [...new Set(parsed.map(game => game.week))];
            if (uniqueWeeks.length === 1) {
              setWeek(uniqueWeeks[0]);
            }
          } catch (error) {
            console.error('Error parsing CSV:', error);
          }
        };
    
        parseCSV('games', setGames);
      }, []);


    const Thurs_games = games.filter(game => game.week == curWeek && game.dayofweek == 'Thursday');
    const Sun_games = games.filter(game => game.week == curWeek && game.dayofweek == 'Sunday');
    const Mon_games = games.filter(game => game.week == curWeek && game.dayofweek == 'Monday');

    return(
        <div>
            <h1>Upcoming Games</h1>
            {week && <h2>Week {week}</h2>}  
            <section className='Games'>
                {Thurs_games.map((game, index) => (
                (game.home && game.away) ? (
                <div key={index} className="game-entry-thu">
                    
                <p className='matchup'>
                    {game.home} vs {game.away}
                </p>
                <h3>{game.dayofweek}, {game.date}</h3>
                <p>Time: {game.time}</p>
                <p>Spread: {game.spread}</p>
                <p className='ou_thu'>Over/Under: {game.overunder}</p>
                </div>
                ) : null
                ))}

                {Sun_games.map((game, index) => (
                (game.home && game.away) ? (
                <div key={index} className="game-entry-sun">
                    
                <p className='matchup'>
                    {game.home} vs {game.away}
                </p>
                <h3>{game.dayofweek}, {game.date}</h3>
                <p>Time: {game.time}</p>
                <p>Spread: {game.spread}</p>
                <p className='ou_sun'>Over/Under: {game.overunder}</p>
                </div>
                ) : null
                ))}

                {Mon_games.map((game, index) => (
                (game.home && game.away) ? (
                <div key={index} className="game-entry-mon">
                    
                <p className='matchup'>
                    {game.home} vs {game.away}
                </p>
                <h3>{game.dayofweek}, {game.date}</h3>
                <p className='time_mon'>Time: {game.time}</p>
                <p className='spread_mon'>Spread: {game.spread}</p>
                <p className='ou_mon'>Over/Under: {game.overunder}</p>
                </div>
                ) : null
                ))}
            </section>
        </div>
    )
} 

export default HomePage;