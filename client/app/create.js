// Sends a POST request to the server with all the new hero information
const handleCharacter = (e) => {
    e.preventDefault();

    // Error checks to make sure all the information was added
    if($("#heroName").val() == '' || $("#primAtt").val() == '' || $("#str").val() == '' || $("#agi").val() == '' || $("#int").val() == ''
    || $("#moveSpeed").val() == '' || $("#armor").val() == '' || $("#b1Name").val() == '' || $("#b2Name").val() == '' || $("#b3Name").val() == '' 
    || $("#uName").val() == '' || $("#b1Desc").val() == '' || $("#b2Desc").val() == '' || $("#b3Desc").val() == ''  || $("#uDesc").val() == ''){
        handleError("All fields are required");
        return false;
    }
    handleError('');

    sendAjax('POST', $("#dotaForm").attr("action"), $("#dotaForm").serialize(), function() {
        $("#character").text('Character created successfully!');
    });
};

// Sets up the basic from with a csrf token, which the actual form will be rendered into
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

// Sets up the form's interior, which is rendered into the above
const DotaCharacterForm = (props) => {
    return(
        <div>
            <div id="base">
                <div className="formInput">
                    <label htmlFor="name">Name</label><br/>
                    <input id="heroName" type="text" name="name" placeholder="Hero Name"/>    
                </div>
                <div className="formInput">
                    <label htmlFor="att">Primary Attribute</label><br/>
                    <select name="primAtt" id="primAtt"> 
                        <option>Strength</option>
                        <option>Agility</option>
                        <option>Intelligence</option>
                    </select>  
                </div>
            </div>

            <div id="stats">
                <div className="formInput">
                    <label htmlFor="str">Strength</label><br/>
                    <input id="str" type="number" name="str" placeholder="Strength"/>    
                </div> 
                <div className="formInput">
                    <label htmlFor="agi">Agility</label><br/>
                    <input id="agi" type="number" name="agi" placeholder="Agility"/>  
                </div>   
                <div className="formInput">  
                    <label htmlFor="int">Intelligence</label><br/>
                    <input id="int" type="number" name="int" placeholder="Intelligence"/>  
                </div> 
                <div className="formInput">
                    <label htmlFor="moveSpeed">Movement Speed</label><br/>
                    <input id="moveSpeed" type="number" name="moveSpeed" placeholder="Movement Speed"/>   
                </div>  
                <div className="formInput">
                    <label htmlFor="armor">Armor</label><br/>
                    <input id="armor" type="number" name="armor" placeholder="Armor"/>
                </div>
            </div>

            <div id="spells">
                <div className="formInput" className="spellInput"> 
                    <label htmlFor="b1">Basic Ability 1</label><br/>
                    <input id="b1Name" type="text" name="b1Name" placeholder="Basic Ability 1 Name"/>    <br/>
                    <textarea className="abilityDesc" id="b1Desc"  name="b1Desc" placeholder="Basic Ability 1 Description"/>    
                </div>
                <div className="formInput" className="spellInput">    
                    <label htmlFor="b2">Basic Ability 2</label><br/>
                    <input id="b2Name" type="text" name="b2Name" placeholder="Basic Ability 2 Name"/>   <br/> 
                    <textarea className="abilityDesc" id="b2Desc" type="text" name="b2Desc" placeholder="Basic Ability 2 Description"/>  
                </div>
                <div className="formInput" className="spellInput"> 
                    <label htmlFor="b3">Basic Ability 3</label><br/>
                    <input id="b3Name" type="text" name="b3Name" placeholder="Basic Ability 3 Name"/>   <br/> 
                    <textarea className="abilityDesc" id="b3Desc" type="text" name="b3Desc" placeholder="Basic Ability 3 Description"/>  
                </div>
                <div className="formInput" className="spellInput">
                    <label htmlFor="u">Ultimate Ability</label><br/>
                    <input id="uName" type="text" name="uName" placeholder="Ultimate Ability Name"/>   <br/>
                    <textarea className="abilityDesc" id="uDesc" type="text" name="uDesc" placeholder="Ultimate Ability Description"/>   
                </div>
            </div>
            <div id="errorMessage"></div>
            <input type="submit" value="Create" id="submitCharacter"/>
            <div id="character"></div>
        </div>
    );
};

// Sets up the hero creation form
const setup = function(csrf) {
    ReactDOM.render(
        <DotaForm csrf={csrf} />, document.querySelector("#createForm")
    );

    
    ReactDOM.render(
        <DotaCharacterForm csrf={csrf} />, document.querySelector("#dotaFormDiv")
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