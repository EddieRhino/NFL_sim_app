// const teams = ["MIN","DET","GNB","CHI","DAL","PHI","WAS","NYG","ATL","NOR","TAM","CAR","LAR","ARI","SFO","SEA",
// "BAL","PIT","CIN","CLE","MIA","NWE","NYJ","BUF","IND","HOU","TEN","JAX","KAN","DEN","LVR","LAC"]



function play_game(QBvalues, RBvalues, Pdefvalues, Rdefvalues, Offvals, home, away){
    let home_team = []
    let away_team = []

    for(let i = 0; i<QBvalues.length; i++){
        if(QBvalues[i].Tm === home){
            home_team.push(QBvalues[i])
            break
        }
    }
    for(let i = 0; i<RBvalues.length; i++){
        if(RBvalues[i].Tm === home){
            home_team.push(RBvalues[i])
            break
        }
    }

    for(let i = 0; i<Pdefvalues.length; i++){
        if(Pdefvalues[i].Tm === home){
            home_team.push(Pdefvalues[i])
            break
        }
    }
    for(let i = 0; i<Rdefvalues.length; i++){
        if(Rdefvalues[i].Tm === home){
            home_team.push(Rdefvalues[i])
            break
        }
    }


    for(let i = 0; i<Offvals.length; i++){
        if(Offvals[i].Tm === home){
            home_team.push(Offvals[i])
            break
        }
    }


    for(let i = 0; i<QBvalues.length; i++){
        if(QBvalues[i].Tm === away){
            away_team.push(QBvalues[i])
            break
        }
    }
    for(let i = 0; i<RBvalues.length; i++){
        if(RBvalues[i].Tm === away){
            away_team.push(RBvalues[i])
            break
        }
    }

    for(let i = 0; i<Pdefvalues.length; i++){
        if(Pdefvalues[i].Tm === away){
            away_team.push(Pdefvalues[i])
            break
        }
    }

    for(let i = 0; i<Rdefvalues.length; i++){
        if(Rdefvalues[i].Tm === away){
            away_team.push(Rdefvalues[i])
            break
        }
    }

    for(let i = 0; i<Offvals.length; i++){
        if(Offvals[i].Tm === away){
            away_team.push(Offvals[i])
            break
        }
    }
    console.log(home_team)
    console.log(away_team)

    let home_cpct = (parseFloat(home_team[0].Cmp) + parseFloat(away_team[2].Cmp))/2
    let away_cpct = (parseFloat(away_team[0].Cmp) + parseFloat(home_team[2].Cmp))/2
    let home_ypp = (parseFloat(home_team[0].YPC) + parseFloat(away_team[2].YPC))/2
    let away_ypp = (parseFloat(away_team[0].YPC) + parseFloat(home_team[2].YPC))/2
    let home_ypr = (parseFloat(home_team[1].YPA) + parseFloat(away_team[3].YPA))/2
    let away_ypr = (parseFloat(away_team[1].YPA) + parseFloat(home_team[3].YPA))/2
    let home_sack = (parseFloat(home_team[0].Sk) + parseFloat(away_team[2].Sk))/2
    let away_sack = (parseFloat(away_team[0].Sk) + parseFloat(home_team[2].Sk))/2
    let home_int = (parseFloat(home_team[0].Int) + parseFloat(away_team[2].Int))/2
    let away_int = (parseFloat(away_team[0].Int) + parseFloat(home_team[2].Int))/2
    let home_fum = (parseFloat(home_team[1].Fmb)/parseFloat(home_team[1].Att))+0.01
    let away_fum = (parseFloat(away_team[1].Fmb)/parseFloat(away_team[1].Att))+0.01


    var away_score, down, home_score, secondHalf, time_left, yardline, yardsleft;
    home_score = 0;
    away_score = 0;
    time_left = 1800;
    down = 1;
    yardline = 25;
    yardsleft = 10;
    secondHalf = false;
    let hasball = true


    function pass_play(team,yard,down2,togo,cpct,ypp,sack,inter){
        let num1 = Math.random();
        let num2 = Math.random();
        hasball = true
        let yards = 0
        if(num1 < cpct/100){
            //console.log("Pass complete")
            if(num2 < 0.02){
                yards = Math.floor(Math.random()*3)-2
                time_left -= 40
            }
            else if(num2 < 0.5){
                yards = Math.floor(Math.random()*ypp)+1
                time_left -= 40
            }

            else if(num2 > 1-(sack/100)){
                console.log("Sacked")
                yards = -5
                time_left -= 40
            }
            else if(num2 > 1-(sack/100)-(inter/100)){
                hasball = false
                console.log("Interception")
            }
            else{
                let val = Math.floor((Math.random()*30))+Math.floor(ypp)
                yards = val
                time_left -= 40
            }
            yard += yards
            togo -= yards
            if(togo <= 0){
                down2 = 1
                togo = 10
            }
            else{
                down2 += 1
            }
            console.log("Pass Play for " + yards + " yards")
        }
        else{
            down2 += 1
            time_left -= 10
            console.log("Pass incomplete")
        }

        return {hasball, yard, down2, togo}
    }

    function run_play(team, yard, down2, togo, fum, ypr){
        let num1 = Math.random();
        let hasball = true
        let yards = 0
        if(num1 < fum){
            console.log("Fumble")
            hasball = false
        }
        else if(num1 < 0.1){
            yards = Math.floor(Math.random()*3)-2
        }
        else if(num1 < 0.6){
            let val = Math.floor((Math.random()*ypr)+1)
            yards = val
        }
        else if(num1 < 0.95){
            let val = Math.floor(Math.random()*6)+Math.floor(ypr)
            yards = val
        }
        else{
            yards = Math.floor(Math.random()*30)+10
        }
        time_left -= 45
        yard += yards
        togo -= yards
        if(togo <= 0){
            down2 = 1
            togo = 10
        }
        else{
            down2 += 1
        }
        console.log("Run Play for " + yards + " yards")
        return {hasball, yard, down2, togo}
    }


    let home_ball = true
    let home_coin = true
    let active_team = []
    let active_vals = []
    if(Math.random()<0.5){ //coin toss
        home_ball = false
        home_coin = false
    }
    down = 1
    yardsleft = 10
    while(true){
        console.log("Down: " + down + "\nTo Go: " + yardsleft)
        console.log("On the " + yardline + " yardline")
        if(home_ball){
            active_team = home_team
            active_vals = [home_cpct,home_ypp,home_ypr,home_sack,home_int,home_fum]
        }
        else{
            active_team = away_team
            active_vals = [away_cpct,away_ypp,away_ypr,away_sack,away_int,away_fum]
        }
        hasball = true
        if(time_left <= 0 && secondHalf){
            break
        }
        if(time_left <= 0){
            secondHalf = true
            time_left = 1800
            if(home_coin){
                home_ball = false
            }
            else{
                home_ball = true
            }
            yardline = 25
            down = 1
            yardsleft = 10
            console.log("Halftime")
            console.log(away_score)
            console.log(home_score)
            continue
        }
        if(down === 1 && (100-yardline < yardsleft)){
            yardsleft = 100-yardline
        }

        //implement field goal stuff here
        if(time_left <= 40 && yardline >= 60){
            if(home_ball){
                home_score += 3
                home_ball = false
            }
            else{
                away_score += 3
                home_ball = true
            }
            yardline = 25
            time_left = 1800
            secondHalf = true
            down = 1
            yardsleft = 10
            console.log("Field Goal")
            console.log(away_score)
            console.log(home_score)
            continue
        }
        else if(down === 4 && yardline >= 60){
            if(home_ball){
                home_score += 3
                home_ball = false
            }
            else{
                away_score += 3
                home_ball = true
            }
            yardline = 25
            time_left -= 5
            down = 1
            yardsleft = 10
            console.log("Field Goal")
            console.log(away_score)
            console.log(home_score)
            continue
        }

        else if(down === 4){
            time_left -= 5
            yardline += 50
            if(yardline >= 100)
                yardline = 20
            else
                yardline = 100-yardline
            if(home_ball){
                home_ball = false
            }
            else{
                home_ball = true
            }
            console.log("Punted")
            down = 1
            yardsleft = 10
            continue
        }
        else{
            const value = parseFloat(active_team[4].PR)/100
            var result
            const num3 = Math.random()
            if(down === 1 && num3 < (value-0.25)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 1){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(yardsleft <= 1 && active_team[0].Tm === "PHI"){
                yardline += 2
                down = 1
                yardsleft = 10
                time_left -= 40
                continue
            }

            else if(down === 2 && yardsleft > 7 && num3 < (value + 0.15)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 2 && yardsleft > 7){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(down === 2 && yardsleft > 3 && num3 < (value - 0.2)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 2 && yardsleft > 3){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(down === 2 && num3 < (value - 0.15)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 2){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(down === 3 && yardsleft > 7 && num3 < (value + 0.4)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 3 && yardsleft > 7){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(down === 3 && yardsleft > 3 && num3 < (value + 0.15)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else if(down === 3 && yardsleft > 3){
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }

            else if(down === 3  && num3 < (value - 0.1)){
                result = pass_play(active_team,yardline, down, yardsleft,active_vals[0],active_vals[1],active_vals[3],active_vals[4])
            }

            else {
                result = run_play(active_team,yardline, down, yardsleft,active_vals[5],active_vals[2])
            }




            down = result.down2
            if(!result.hasball){
                if(home_ball){
                    home_ball = false
                    yardline = 100-yardline
                }
                else{
                    home_ball = true
                    yardline = 100-yardline
                }
                down = 1
                yardsleft = 10
                continue
            }
            yardline = result.yard
            yardsleft = result.togo


            if(yardline <= 0){
                if(home_ball){
                    away_score += 2
                    home_ball = false
                }
                else{
                    home_score += 2
                    home_ball = true
                }
                console.log("Safety")
                yardline = 35
                down = 1
                yardsleft = 10
                console.log(away_score)
                console.log(home_score)
                continue
            }
            else if(yardline >= 100){
                if(home_ball){
                    home_score += 6
                    if(Math.random() <= 0.97){
                        home_score += 1
                        console.log("PAT")
                    }
                    home_ball = false
                }
                else{
                    away_score += 6
                    if(Math.random() <= 0.97){
                        away_score += 1
                        console.log("PAT")
                    }
                    home_ball = true
                }
                console.log("Touchdown")
                console.log(away_score)
                console.log(home_score)
                yardline = 25
                down = 1
                yardsleft = 10
                continue
            }

        }
    }
    console.log(away_score)
    console.log(home_score)
    if(away_score === home_score){
        console.log("Overtime")
        if(Math.random() < 0.5){
            home_score += 3
        }
        else{
            away_score += 3
        }
        console.log(away_score)
        console.log(home_score)
    }
    return [away_score,home_score]
}
export default play_game;
