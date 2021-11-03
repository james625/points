import React from 'react';

class Points extends React.Component{

    constructor(props){
        super(props)
        this.state = { payer: "", points: "", spend: "", total: 0, errors: "" }
        this.balance = {}
        this.queue = []
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSpend = this.handleSpend.bind(this)
    }

    handleChange(value) {
        return e => {
            e.preventDefault();
            this.setState({ [value]: e.currentTarget.value })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        if (!this.balance[this.state.payer]) {
            this.balance[this.state.payer] = parseInt(this.state.points)
        } else {
            this.balance[this.state.payer] += parseInt(this.state.points)
        }
        this.queue.push({ payer: this.state.payer, points: parseInt(this.state.points) })
        let counter = 0
        Object.values(this.balance).forEach(values => {
            counter += values
        })
        if (parseInt(this.state.points) < 0) {
            let points = parseInt(this.state.points) * -1
            this.queue.forEach( balance => {
                if (balance.payer === this.state.payer) {
                    if (balance.points > points) {
                        balance.points -= points
                        points = 0
                    } else {
                        points -= balance.points
                        balance.points = 0
                    }
                }
            })
        }
        this.setState({ total: counter, payer: "", points: "" })
    }

    handleSpend(e) {
        e.preventDefault();
        let points = parseInt(this.state.spend)
        if (points > this.state.total) {
            this.setState({ errors: "Not Enough Points!" })
        } else {
            while (points > 0) {
                let current = this.queue[0].points
                if (current <= 0) {
                    this.queue.shift()
                } else if (current <= points) {
                    points -= current
                    this.balance[this.queue[0].payer] -= current
                    this.queue.shift()
                } else {
                    current -= points
                    this.balance[this.queue[0].payer] -= points
                    this.queue[0].points = current
                    points = 0
                }
            }
            let counter = 0
            Object.values(this.balance).forEach(values => {
                counter += values
            })
            this.setState({ spend: "", total: counter })
        }
    }

    render() {
        return(
            <div>
                <div>Demo User</div>
                <div>Total Points: {this.state.total}</div>
                <br></br>

                <form onSubmit={this.handleSpend}>
                    {this.state.errors}
                    <br></br>
                    <label>Spend Points:
                        <input type="number" value={this.state.spend} onChange={this.handleChange("spend")}></input>
                    </label>
                    <button>Spend!</button>
                </form>

                <br></br>
                <br></br>
                <form onSubmit={this.handleSubmit}>Add Transaction
                    <br></br>
                    <label>Payer:
                        <input type="text" value={this.state.payer} onChange={this.handleChange("payer")}></input>
                    </label>

                    <br></br>
                    <label>Points:
                        <input type="text" value={this.state.points} onChange={this.handleChange("points")}></input>
                    </label>
                    <br></br>
                    <button>Submit</button>
                </form>

                <div>Points Balance</div>
                {Object.keys(this.balance).map( key => {
                    return(
                        <div>{`${key}: ${this.balance[key]}`}</div>
                    )
                })}
            </div>
        )
    }
}

export default Points;