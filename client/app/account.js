const handlePass = (e) => {
    e.preventDefault();

    // Checks for proper value input
    if ($("#pass").val() == '' || $("#pass2").val() == ''){
        handleError("All fields are required");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()){
        handleError("Passwords must match!");
        return false;
    }

    handleError("");

    // Sends signup request to the server
    sendAjax('PATCH', $("#changePass").attr("action"), $("#changePass").serialize(), function(account) {
        $("#passSuccess").text('Password changed successfully!');
    });
};

const AccountInfo = (props) => {
    return(
        <div>
            <label id="passLabel">Change Password</label>
            <form id="changePass" 
            name="changePass"
            onSubmit={handlePass}
            action="/changePass"
            method="PATCH"
            className="changePass">
                <label htmlFor="pass">Password: </label>
                <input id="pass" type="password" name="pass" placeholder="password"/>  <br/>
                <label htmlFor="pass2">Password: </label>
                <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
                <input type="hidden" name="_csrf" value={props.csrf} />   
                <input id="passSubmit" type="submit" value="Change Password"/>
                <div id="errorMessage"></div>
            </form>
        </div>
            
    );
};

const setup = function(csrf) {
    ReactDOM.render(
        <AccountInfo csrf={csrf} />, document.querySelector("#accountInfo")
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