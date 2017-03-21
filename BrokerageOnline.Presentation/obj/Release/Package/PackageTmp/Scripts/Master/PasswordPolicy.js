var PasswordPolicy = {
    AddNewPolicy: function () {
        $('#mdl_Edit_Policy').modal('show');
    },

    ClearEditScreen: function () {
        $('#hidden_policy_id').val("");
        $('#txtdisablecount').val("");
        $('#txtexipirydays').val("");
        $('#txtexpirepromptdate').val("");

        $('#txtminlength').val("");
        $('#txtmaxcharacterscount').val("");
        $('#txtmincharacterscount').val("");

        $('#txtmindigitscount').val("");
        $('#txtuppercasecount').val("");
        $('#txtlowercasecount').val("");

        $('#txtsplcharscount').val("");
        $('#txthistorynumber').val("");
        $('#txtdigitscount').val("");
        $('#txtcharscount').val(""); 
    },
 
    LoadPolicy: function () {
            var search = "";
        Utility.ServiceCall("POST", 'MasterService.svc/GetPasswordPolicy', JSON.stringify({ SearchText: search }), "json", false, false, function (result) {
            var data = result.GetPasswordPolicyResult;
            if (data.length > 0) {
                $('#hidden_policy_id').val(data[0].PolicyId);
                $('#txtdisablecount').val(data[0].DisableAttemptCount);
                $('#txtexipirydays').val(data[0].ExpiryDays);
                $('#txtexpirepromptdate').val(data[0].ExpirePromptDays);

                $('#txtminlength').val(data[0].MinLength);
                $('#txtmaxcharacterscount').val(data[0].MaxCharacters);
                $('#txtmincharacterscount').val(data[0].MinCharacters);

                $('#txtmindigitscount').val(data[0].MinDigitCount);
                $('#txtuppercasecount').val(data[0].MinUpperCaseCount);
                $('#txtlowercasecount').val(data[0].MinLowerCaseCount);

                $('#txtsplcharscount').val(data[0].MinSplCharCount);
                $('#txthistorynumber').val(data[0].HistoryNumber);
                $('#txtdigitscount').val(data[0].DigitsCount);
                $('#txtcharscount').val(data[0].CharsCount);

                $('#spndisablecount').html(data[0].DisableAttemptCount);
                $('#spnexipirydays').html(data[0].ExpiryDays);
                $('#spnexpirepromptdate').html(data[0].ExpirePromptDays);

                $('#spnminlength').html(data[0].MinLength);
                $('#spnmaxcharacterscount').html(data[0].MaxCharacters);
                $('#spnmincharacterscount').html(data[0].MinCharacters);

                $('#spnmindigitscount').html(data[0].MinDigitCount);
                $('#spnuppercasecount').html(data[0].MinUpperCaseCount);
                $('#spnlowercasecount').html(data[0].MinLowerCaseCount);

                $('#spnsplcharscount').html(data[0].MinSplCharCount);
                $('#spnhistorynumber').html(data[0].HistoryNumber);
                $('#spndigitscount').html(data[0].DigitsCount);
                $('#spncharscount').html(data[0].CharsCount);
                $('#chklogidpwdsame').removeAttr('checked');
                $('#spnlogidpwdsame').html("Not Applicable");
                if (data[0].PwdUIdSame == "1") {
                    $('#spnlogidpwdsame').html("Applicable");
                    $('#chklogidpwdsame').prop('checked', true);
                }
            }
            else {
                Utility.writeNotification("error", "No Records Found", "", true);
            }
        });
    },

    SavePolicy: function () {
        if (PasswordPolicy.PolicyValid()) {
            var Policy = {};
            Policy.PolicyId = $('#hidden_policy_id').val() == "" ? 0 : $('#hidden_policy_id').val();
            Policy.DisableAttemptCount = $('#txtdisablecount').val();
            Policy.ExpiryDays = $('#txtexipirydays').val();
            Policy.ExpirePromptDays = $('#txtexpirepromptdate').val();

            Policy.MinLength = $('#txtminlength').val();
            Policy.MaxCharacters = $('#txtmaxcharacterscount').val();
            Policy.MinCharacters = $('#txtmincharacterscount').val();

            Policy.MinDigitCount = $('#txtmindigitscount').val();
            Policy.MinUpperCaseCount = $('#txtuppercasecount').val();
            Policy.MinLowerCaseCount = $('#txtlowercasecount').val();

            Policy.MinSplCharCount = $('#txtsplcharscount').val();
            Policy.HistoryNumber = $('#txthistorynumber').val();
            Policy.DigitsCount = $('#txtdigitscount').val();
            Policy.CharsCount = $('#txtcharscount').val();
            Policy.PwdUIdSame = "0";
            if ($('#chklogidpwdsame').is(":checked")) {
                Policy.PwdUIdSame = "1";
            }
            
            Utility.ServiceCall("POST", 'MasterService.svc/Insert_Update_PasswordPolicy', JSON.stringify({ InputData: Policy }), "json", false, false, function (result) {
                if (Policy.PolicyId == 0)
                    Utility.writeNotification("success", "Password Policy Inserted Successfully", "", false);
                else
                    Utility.writeNotification("success", "Password Policy Updated Successfully", "", false);

                $('#mdl_Edit_Policy').modal('hide');

                PasswordPolicy.LoadPolicy();
            });

        }
    },

    PolicyValid: function () {        
        var error = "";
        if ($('#txtdisablecount').val() == "")
            error += "Disable Count Required. <br/>"

        if ($('#txtexipirydays').val() == "")
            error += "Expiry Days Required. <br/>"

        if ($('#txtexpirepromptdate').val() == "")
            error += "Expire Prompt Days Required. <br/>"

        if ($('#txtminlength').val() == "")
            error += "Password Minimum Length Required. <br/>"

        if ($('#txtmaxcharacterscount').val() == "")
            error += "Maximum Characters Count Required. <br/>"

        if ($('#txtmincharacterscount').val() == "")
            error += "Minimum Characters Count Required. <br/>"

        if ($('#txtmindigitscount').val() == "")
            error += "Minimum Digits Count Required. <br/>"

        if ($('#txtuppercasecount').val() == "")
            error += "UpperCase Count Required. <br/>"

        if ($('#txtlowercasecount').val() == "")
            error += "LowerCase Count Required. <br/>"

        if ($('#txtsplcharscount').val() == "")
            error += "Special Characters Count Required. <br/>"

        if ($('#txthistorynumber').val() == "")
            error += "Status Required. <br/>"

        if ($('#txtdigitscount').val() == "")
            error += "History Number Required. <br/>"

        if ($('#txtcharscount').val() == "")
            error += "Characters Count Required. <br/>"

        if (error == "")
            return true;
        else {
            Utility.writeNotification("warning", error, "", true);
            return false;
        }
    },

    Cancel: function () {
        PasswordPolicy.ClearEditScreen();
        $('#mdl_Edit_Policy').modal('hide');
    },
}


$(function () {
    PasswordPolicy.LoadPolicy();
});