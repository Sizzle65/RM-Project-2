const handleVote = (e) => {
    e.preventDefault();
    let accountName = $("#selectedAccount").text();

    sendAjax('PATCH', e.target.act.value, { account: accountName, heroId: e.target.heroId.value }, (data) => {
        console.log("It works");
    });
};

// Grabs all the heroes for the selected account from the server 
const handleCharacters = (e) => {
    e.preventDefault();
    let token = e.target._csrf.value;
    sendAjax('GET', '/getAccount', { id: e.target.id.value}, (data) => {
        $("#selectedAccount").text(data.account.username); 

        // Adds the queried heroes to the screen
        ReactDOM.render(
            <DotaList heroes={data.heroes} csrf={token} />, document.querySelector("#dotaCharacters")
        );
    });
};

// Sets up the format for the displaying of heroes
const DotaList = (props) => {
    if(props.heroes.length === 0) {
        return(
            <div className="heroList">
                <h3 className="emptyHero">No Heroes yet</h3>
            </div>
        );
    }

    const heroNodes = props.heroes.map(function(hero) {
        return (
            <div className="outerCard">
                <form className="voteForm" 
                    id="voteUp" 
                    name="voteUp"
                    onSubmit={handleVote}
                    action="/voteUp"
                    method="PATCH">
                    <input type="hidden" name="_csrf" value={props.csrf}/>   
                    <input type="hidden" name="heroId" value={hero._id} /> 
                    <input type="hidden" name="act" value="/voteUp" /> 
                    <input type="image" src="/assets/img/thumbUp.png" name="upvote" className="up" />
                </form>
                <label className="rating">{hero.rating}</label>
                <form className="voteForm" 
                    id="voteDown" 
                    name="voteDown"
                    onSubmit={handleVote}
                    action="/voteDown"
                    method="PATCH">
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input type="hidden" name="heroId" value={hero._id} /> 
                    <input type="hidden" name="act" value="/voteDown" /> 
                    <input type="image" src="/assets/img/thumbDown.png" name="downvote" className="down" />
                </form> <br/>
                <div key={hero._id} className="dotaCard" target={hero.primaryAttribute}>
                    <h2 className="name"> {hero.name} </h2>
                    <div className="stats">
                        <h3 className="primAtt"> {hero.primaryAttribute} </h3>
                        <h3 className="stat"> <img className="statIcon" src="/assets/img/str.png" alt="str icon"/> {hero.strength} </h3>
                        <h3 className="stat"> <img className="statIcon" src="/assets/img/agi.png" alt="agi icon"/> {hero.agility} </h3>
                        <h3 className="stat"> <img className="statIcon" src="/assets/img/int.png" alt="int icon"/> {hero.intelligence} </h3>
                        <h3 className="stat"> <img className="statIcon" src="/assets/img/boot.png" alt="boot icon"/> {hero.moveSpeed} </h3>
                        <h3 className="stat"> <img className="statIcon" src="/assets/img/shield.png" alt="shield icon"/> {hero.intelligence} </h3>
                    </div>
                    <div className="abilities">
                        <div className="spell">
                            <h3 className="spellName"> {hero.basicName1} </h3>
                            <h3 className="spellDesc"> {hero.basicDesc1} </h3>
                        </div>
                        
                        <div className="spell">
                            <h3 className="spellName"> {hero.basicName2} </h3>
                            <h3 className="spellDesc"> {hero.basicDesc2} </h3>
                        </div>

                        <div className="spell">
                            <h3 className="spellName">{hero.basicName3} </h3>
                            <h3 className="spellDesc"> {hero.basicDesc3} </h3>
                        </div>

                        <div className="spell">
                            <h3 className="spellName"> {hero.ultimateName} </h3>
                            <h3 className="spellDesc"> {hero.ultimateDesc} </h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="heroList">
            {heroNodes}
        </div>
    );
};

// Sets up the format for the displaying of accounts
const AccountList = (props) => {
    if(props.accounts.length === 0) {
        return(
            <div className="accountList">
                <h3 className="emptyAccounts">No Accounts yet</h3>
            </div>
        );
    }

    const accountNodes = props.accounts.map(function(account) {
        let action = '/getAccount?' + account._id;
        return (
            <div key={account._id} className="accountCard">
                <form id="accountForm" 
                    name="accountForm"
                    onSubmit={handleCharacters}
                    action={action}
                    method="GET"
                    className="accountForm">
                <input type="hidden" name="_csrf" value={props.csrf} />   
                <input type="hidden" name="id" value={account._id} />   
                <input type="submit" value={account.username} id="submitAccount"/>         
                </form>
            </div>
        );
    });

    return (
        <div className="accountList">
            {accountNodes}
        </div>
    );
};

// Grabs all accounts from the server, except the one currently logged on
const loadAccountsFromServer = (csrf) => {
    sendAjax('GET', '/getAccounts', null, (data) => {
        ReactDOM.render(
            <AccountList accounts={data.accounts} csrf={csrf} />, document.querySelector("#accounts")
        );
    });
};

// Grabs top heroes across all accounts
const loadHeroesFromServer = (csrf) => {
    sendAjax('GET', '/getTop', null, (data) => {
        ReactDOM.render(
            <DotaList heroes={data.heroes} csrf={csrf} />, document.querySelector("#topHeroes")
        );
    });
};

const setup = function(csrf) {
    loadAccountsFromServer(csrf);
    loadHeroesFromServer(csrf);
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});