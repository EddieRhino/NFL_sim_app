import './sim_styles.css';
import React, { useState, useEffect } from 'react';
import play_game from './Simulation';
import Papa from 'papaparse';

function SimPage(){
    const [QBvalues, setQBvalues] = useState([]);
  const [RBvalues, setRBvalues] = useState([]);
  const [Pdefvalues, setPdefvalues] = useState([]);
  const [Rdefvalues, setRdefvalues] = useState([]);
  const [Offvalues, setOffvalues] = useState([]);

  useEffect(() => {
    const parseCSV = async (fileName, setStateFunction) => {
      const response = await fetch(`/csv/${fileName}.csv`); // Assuming your CSVs are in the "csv" folder
      const reader = response.body.getReader();
      const result = await reader.read();
      const text = new TextDecoder().decode(result.value);
      const parsed = Papa.parse(text, { header: true }).data;
      setStateFunction(parsed);
    };

    parseCSV('QB', setQBvalues);
    parseCSV('RB', setRBvalues);
    parseCSV('passdefense', setPdefvalues);
    parseCSV('rushdefense', setRdefvalues);
    parseCSV('offense', setOffvalues);
  }, []);

  const [homeTeam, setHomeTeam] = useState('MIN');
  const [awayTeam, setAwayTeam] = useState('GNB');
  const [times, setTimes] = useState(100);
  const [spread, setSpread] = useState(0)
  const [ou,setOU] = useState(40.5)

  const [finalScore, setFinalScore] = useState(null);
  const [away_wins, setAwayWins] = useState(0)
  const [home_wins, setHomeWins] = useState(0)
  const [away_covers, setAwayCovers] = useState(0)
  const [home_covers, setHomeCovers] = useState(0)
  const [overs, setOvers] = useState(0)
  const [unders, setUnders] = useState(0)
  const [spread_pushes, setSpreadPushes] = useState(0)
  const [ou_pushes, setOUPushes] = useState(0)



  const handleSimulation = () => {
    let h_wins = 0
    let a_wins = 0
    let h_covers = 0
    let a_covers = 0
    let overs = 0
    let unders = 0
    let spreadPush = 0
    let ouPush = 0
    for(let i = 0; i<times; i++){
      const result = play_game(QBvalues,RBvalues,Pdefvalues,Rdefvalues,Offvalues,homeTeam,awayTeam);
      setFinalScore(result)
      if(result[0] > result[1]){
        a_wins++
        setAwayWins(a_wins)
      }
      else{
        h_wins++
        setHomeWins(h_wins)
      }
      if(result[0] > (result[1] + parseFloat(spread))){
        a_covers++
        setAwayCovers(a_covers)
      }
      else if(result[0] < (result[1] + parseFloat(spread))){
        h_covers++
        setHomeCovers(h_covers)
      }
      else{
        spreadPush++
        setSpreadPushes(spreadPush)
      }

      if(result[0] + result[1] > ou){
        overs++
        setOvers(overs)
      }
      else if(result[0] + result[1] < ou){
        unders++
        setUnders(unders)
      }
      else{
        ouPush++
        setOUPushes(ouPush)
      }
    }
  };

  // const handlePower = () => {

  // }




  return (
    <div className="choices">
      {/* <header>
        <nav>

        </nav>
      </header> */}
      <h1>NFL SIMULATOR</h1>
      <h2>Simulate Games</h2>
      <div className="home-team">
        <label for="home">Who should be the Home Team? </label>
          <select name="home" id="home" className = "home_select" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)}>
            <option value="ARI">ARI</option>
            <option value="ATL">ATL</option>
            <option value="BAL">BAL</option>
            <option value="BUF">BUF</option>
            <option value="CAR">CAR</option>
            <option value="CHI">CHI</option>
            <option value="CIN">CIN</option>
            <option value="CLE">CLE</option>
            <option value="DAL">DAL</option>
            <option value="DEN">DEN</option>
            <option value="DET">DET</option>
            <option value="GNB">GNB</option>
            <option value="HOU">HOU</option>
            <option value="IND">IND</option>
            <option value="JAX">JAX</option>
            <option value="KAN">KAN</option>
            <option value="LVR">LVR</option>
            <option value="LAC">LAC</option>
            <option value="LAR">LAR</option>
            <option value="MIA">MIA</option>
            <option value="MIN">MIN</option>
            <option value="NWE">NWE</option>
            <option value="NOR">NOR</option>
            <option value="NYG">NYG</option>
            <option value="NYJ">NYJ</option>
            <option value="PHI">PHI</option>
            <option value="PIT">PIT</option>
            <option value="SFO">SFO</option>
            <option value="SEA">SEA</option>
            <option value="TAM">TAM</option>
            <option value="TEN">TEN</option>
            <option value="WAS">WAS</option>
          </select>
          
      </div>
      <div className="away-team">
        <label for="away">Who should be the Away Team? </label>
        <select name="away" id="away" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)}>
        <option value="ARI">ARI</option>
            <option value="ATL">ATL</option>
            <option value="BAL">BAL</option>
            <option value="BUF">BUF</option>
            <option value="CAR">CAR</option>
            <option value="CHI">CHI</option>
            <option value="CIN">CIN</option>
            <option value="CLE">CLE</option>
            <option value="DAL">DAL</option>
            <option value="DEN">DEN</option>
            <option value="DET">DET</option>
            <option value="GNB">GNB</option>
            <option value="HOU">HOU</option>
            <option value="IND">IND</option>
            <option value="JAX">JAX</option>
            <option value="KAN">KAN</option>
            <option value="LVR">LVR</option>
            <option value="LAC">LAC</option>
            <option value="LAR">LAR</option>
            <option value="MIA">MIA</option>
            <option value="MIN">MIN</option>
            <option value="NWE">NWE</option>
            <option value="NOR">NOR</option>
            <option value="NYG">NYG</option>
            <option value="NYJ">NYJ</option>
            <option value="PHI">PHI</option>
            <option value="PIT">PIT</option>
            <option value="SFO">SFO</option>
            <option value="SEA">SEA</option>
            <option value="TAM">TAM</option>
            <option value="TEN">TEN</option>
            <option value="WAS">WAS</option>
          </select>

      </div>

      <section class="num">
        <label for="Num">How Many Games Would you like to Simulate? </label>
        <input type="number" name="sims" id="sims" value={times} onChange={(e) => setTimes(e.target.value)}/>
      </section>

      <section class="spread">
        <label for="spread">What is the Spread Relative to the Home Team? </label>
        <input type="number" name="spread" id="spread" step="0.5" value = {spread} onChange={(e) => setSpread(e.target.value)}/>
      </section>

      <section class="over-under">
        <label for="ou">What is the Over/Under of the Game? </label>
        <input type="number" name="ou" id="ou" step="0.5" min="0" value = {ou} onChange={(e) => setOU(e.target.value)}/>
      </section> 


      <section class="simulate">
        <button onClick={handleSimulation} class="submission">Simulate</button>
      </section>
      <section class="score">
        {finalScore && (
        <div>
          <p className='wins'>{awayTeam} Wins: {away_wins} {homeTeam} Wins: {home_wins}</p>
          <p className='covers'>{awayTeam} Covers: {away_covers} {homeTeam} Covers: {home_covers} Pushes: {spread_pushes}</p>
          <p className='overs'>Overs Hit: {overs} Unders Hit: {unders} Pushes: {ou_pushes}</p>
        </div>
      )}
      </section>
      {/* <h2 className='power'>Power Rankings</h2>
      <section class="simPower">
        <button onClick={handlePower} class = "sub_power">Simulate</button>
      </section> */}
    </div>
  );
}

export default SimPage;