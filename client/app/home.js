const handleDelete = (e) => {
    e.preventDefault();

    sendAjax('DELETE', '/deleteHero', { name : e.target.name.value, _csrf: e.target._csrf.value } , () => {
        sendAjax('GET', '/getToken', null, (result) => {
            loadHeroesFromServer(result.csrfToken);
        });
    });
}

// Sets up the list of heroes and how they will be displayed
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
            <div className="card">
                <form className="deleteForm" 
                    id="deleteForm" 
                    name="deleteForm"
                    onSubmit={handleDelete}
                    action="/deleteHero"
                    method="DELETE">
                    <input type="hidden" name="_csrf" value={props.csrf}/>   
                    <input type="hidden" name="name" value={hero.name} /> 
                    <input type="image" src="/assets/img/delete.png" name="upvote" className="delete" target={hero.primaryAttribute} title="Delete Character" />
                </form>
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

// Grabs all the heroes from the server that are tied to the currect account
const loadHeroesFromServer = (csrf) => {
    sendAjax('GET', '/getHeroes', null, (data) => {
        ReactDOM.render(
            <DotaList heroes={data.strength} csrf={csrf} />, document.querySelector("#strengthHeroes")
        );
        ReactDOM.render(
            <DotaList heroes={data.agility} csrf={csrf} />, document.querySelector("#agilityHeroes")
        );
        ReactDOM.render(
            <DotaList heroes={data.intelligence} csrf={csrf} />, document.querySelector("#intelligenceHeroes")
        );
    });
};

const setup = function(csrf) {
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