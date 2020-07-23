export const validateForm = (value,rules) => {
    let isValid = true;
    const pattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;            
    if(rules.required)
        isValid = value.trim()!=='' && isValid? true : false;
    if(rules.minLength)
        isValid = value.length>=rules.minLength && isValid? true : false;
    if(rules.emailPattern){
        isValid = pattern.test(value) && isValid? true : false;
    }
    return isValid
}