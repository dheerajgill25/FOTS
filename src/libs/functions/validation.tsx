export const email = (data: any) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data,
    );
export const password = (data: any) => /^(?=.*\d).{6,20}$/.test(data);
export const mobile = (data: any) => /^().{5,15}$/.test(data);
export const number = (data: any) => /^([0-9\-\(\)\s]+).{0,50}$/.test(data);
export const date = (data: any) =>
    /^(\d{1,2})(\/)(\d{1,2})(\/)(\d{4})$/.test(data);
export const pincode = (data: any) => /^().{6,10}$/.test(data);

export function validateLogin(values: any) {
    var errors: { [k: string]: any } = {};
    if (!values?.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values?.password) {
        errors.password = 'Password Required';
    } else if (values?.password?.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    return errors;
}
export function validateForgotPassword(values: any) {
    var errors: { [k: string]: any } = {};
    if (!values?.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    return errors;
}

export function validateRegister(values: any) {
    var errors: { [k: string]: any } = {};

    if (!values?.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values?.password) {
        errors.password = 'Password Required';
    } else if (values?.password?.length < 6) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (!values?.first_name) {
        errors.first_name = 'First Name Required';
    } else if (values?.first_name?.length < 3) {
        errors.first_name = 'First Name must be at least 3 characters';
    }

    if (!values?.last_name) {
        errors.last_name = 'lastName Required';
    } else if (values?.last_name?.length < 2) {
        errors.last_name = 'LastName must be at least 2 characters';
    }
    return errors;
}

export function validateResetPassword(values: any) {
    var errors: { [k: string]: any } = {};
    if (!values?.current_password) {
        errors.current_password = 'Password Required';
    } else if (values?.current_password?.length < 6) {
        errors.current_password = 'Password must be at least 6 characters';
    }
    if (!values?.password) {
        errors.password = 'New Password Required';
    } else if (values?.password?.length < 6) {
        errors.password = 'New Password must be at least 6 characters';
    }

    if (!values?.confirm_password) {
        errors.confirm_password = 'Confirm Password Required';
    } else if (!(values?.password == values?.confirm_password)) {
        errors.confirm_password =
            'Your password and confirmation password do not match.';
    }
    return errors;
}
