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
            <div key={hero._id} className="heroCard">
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
        );
    });

    return (
        <div className="heroList">
            {heroNodes}
        </div>
    );
};

const loadHeroesFromServer = () => {
    sendAjax('GET', '/getHeroes', null, (data) => {
        ReactDOM.render(
            <DotaList heroes={data.heroes} />, document.querySelector("#dotaCharacters")
        );
    });
};

const setup = function(csrf) {
    // ReactDOM.render(
    //     <DotaList heroes={[]} />, document.querySelector("#dotaCharacters")
    // );

    loadHeroesFromServer();
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});