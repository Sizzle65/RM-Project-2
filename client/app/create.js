const handleCharacter = (e) => {
    e.preventDefault();

    if($("#heroName").val() == '' || $("#primAtt").val() == '' || $("#str").val() == '' || $("#agi").val() == '' || $("#int").val() == ''
    || $("#moveSpeed").val() == '' || $("#armor").val() == '' || $("#b1Name").val() == '' || $("#b2Name").val() == '' || $("#b3Name").val() == '' 
    || $("#uName").val() == '' || $("#b1Desc").val() == '' || $("#b2Desc").val() == '' || $("#b3Desc").val() == ''  || $("#uDesc").val() == ''){
        handleError("All fields are required");
        return false;
    }
    $("#errorMessage").text('');

    sendAjax('POST', $("#dotaForm").attr("action"), $("#dotaForm").serialize(), function() {
        $("#character").text('Character created successfully!');
    });
};

const setForm = (e) => {
    e.preventDefault();

    switch($("#game").val()){
        case 'Dota 2': ReactDOM.render(
                            <DotaCharacterForm />, document.querySelector("#dotaFormDiv")
                        );
            break;
        case 'League of Legends':
            break;
        case 'Smite':
            break;
    }
};

const GameForm = (props) => {
    return(
        <form id="selectGame" 
        name="selectGame"
        onSubmit={setForm}>
            <select name="options" id="game"> 
                <option>Dota 2</option>
                <option>League of Legends</option>
                <option>Smite</option>
            </select>
            <input type="hidden" name="_csrf" value={props.csrf}/>   
            <input type="submit" value="Select Game" id="submitGame"/>
        </form>
    );
};

const DotaForm = (props) => {
    return(
    <form id="dotaForm" 
    name="dotaForm"
    onSubmit={handleCharacter}
    action="/createDotaCharacter"
    method="POST"
    className="dotaForm">
        <div id="dotaFormDiv"></div>
        <input type="hidden" name="_csrf" value={props.csrf}/>   
    </form>
    );
    
};

const DotaCharacterForm = (props) => {
    return(
        <div>
            <img id="dotaLogo" src="/assets/img/dota.png" alt="dota logo"/>
            <div id="base">
                <label htmlFor="name">Name: </label>
                <input id="heroName" type="text" name="name" placeholder="Hero Name"/>    
                <label htmlFor="att">Primary Attribute: </label>
                <select name="primAtt" id="primAtt"> 
                    <option>Strength</option>
                    <option>Agility</option>
                    <option>Intelligence</option>
                </select>  
            </div>

            <div id="stats">
                <label htmlFor="str">Strength: </label>
                <input id="str" type="number" name="str" placeholder="Strength"/>    
                <label htmlFor="agi">Agility: </label>
                <input id="agi" type="number" name="agi" placeholder="Agility"/>   
                <label htmlFor="int">Intelligence: </label>
                <input id="int" type="number" name="int" placeholder="Intelligence"/>  
                <label htmlFor="moveSpeed">Movement Speed: </label>
                <input id="moveSpeed" type="number" name="moveSpeed" placeholder="Movement Speed"/>   
                <label htmlFor="armor">Armor: </label>
                <input id="armor" type="number" name="armor" placeholder="Armor"/>
            </div>

            <div id="spells">
                <label htmlFor="b1">Basic Ability 1: </label>
                <input id="b1Name" type="text" name="b1Name" placeholder="Basic Ability 1 Name"/>    
                <input className="abilityDesc" id="b1Desc" type="text" name="b1Desc" placeholder="Basic Ability 1 Description"/>    
                <label htmlFor="b2">Basic Ability 2: </label>
                <input id="b2Name" type="text" name="b2Name" placeholder="Basic Ability 2 Name"/>    
                <input className="abilityDesc" id="b2Desc" type="text" name="b2Desc" placeholder="Basic Ability 2 Description"/>  
                <label htmlFor="b3">Basic Ability 3: </label>
                <input id="b3Name" type="text" name="b3Name" placeholder="Basic Ability 3 Name"/>    
                <input className="abilityDesc" id="b3Desc" type="text" name="b3Desc" placeholder="Basic Ability 3 Description"/>  
                <label htmlFor="u">Ultimate Ability: </label>
                <input id="uName" type="text" name="uName" placeholder="Ultimate Ability Name"/>   
                <input className="abilityDesc" id="uDesc" type="text" name="uDesc" placeholder="Ultimate Ability Description"/>   
            </div>

            <input type="submit" value="Create" id="submitCharacter"/>
        </div>
    );
};

const setup = function(csrf) {
    ReactDOM.render(
        <GameForm csrf={csrf} />, document.querySelector("#gameChoice")
    );

    ReactDOM.render(
        <DotaForm csrf={csrf} />, document.querySelector("#createForm")
    );
}

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});