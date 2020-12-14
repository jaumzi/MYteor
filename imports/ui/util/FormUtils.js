class FormUtils {

  formRef;

  constructor(formRef) {
    this.formRef = formRef.current;
  }

  clearData(name = '') {
    Object.entries(this.formRef?.elements).forEach(([el_key, el_value]) => {
      if (!name || (!!name && el_key === name)) {
        el_value.value = '';
      }
    });
    return;
  }

  getData(name) {
    return this.formRef?.elements[name]?.value;
  }
}

export default FormUtils;
