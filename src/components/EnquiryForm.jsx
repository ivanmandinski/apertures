import React, { useState, useEffect } from "react";
import '../assets/scss/components/enquiryForm.scss';
/*
const EnquiryForm = () => {
    const [tokenData, setTokenData] = useState(null);
    useEffect(() => {
        const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/jwt-auth/v1/token`;
        axios.post(api_path, {
            username: process.env.REACT_APP_admin_username,
            password: process.env.REACT_APP_admin_password
        })
            .then(function (response) {
                //console.log(response.data.token);
                setTokenData(response.data.token);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const [successState, setSuccessState] = useState(false);
    const initialValuess = {
        fname: "",
        lname: "",
        affiliation: "",
        email: "",
        phone: "",
        inquiry: "",
        comment: ""
    }

    const validationSchemaa = yup.object().shape({
        fname: yup.string().required("Please enter your first name"),
        lname: yup.string().required("Please enter your last name"),
        email: yup.string().required("Please enter your email").email("Invalid email address format"),
        inquiry: yup.string().required("Please select a option"),
        comment: yup.string().required("Please enter your comment"),
    });

    const handleSubmit = (values, { resetForm }) => {
        //console.log(values);

        if (tokenData) {
            const config = {
                headers: { Authorization: `Bearer ${tokenData}` }
            };

            const api_path = `${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/contact_data`;
            axios.post(api_path, values, config)
                .then(function (response) {
                    //console.log(response);

                    if(response.data === "sent"){
                        resetForm({ values: "" });
                        setSuccessState(true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <FormSection>
            <div className="form-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>What are <span>you</span> after?</h2>
                            <h4 className="mb-5"><strong>Let's get there, together.</strong></h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <Formik initialValues={initialValuess} validationSchema={validationSchemaa} onSubmit={handleSubmit}>
                                <Form>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field type="text" className="field_text" placeholder="First name*" autoComplete="off" name="fname" id="form_fname" />
                                                <p className="validation_error"><ErrorMessage name="fname" /></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field type="text" className="field_text" placeholder="Last name*" autoComplete="off" name="lname" id="form_lname" />
                                                <p className="validation_error"><ErrorMessage name="lname" /></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field type="text" className="field_text" placeholder="Company/affiliation" autoComplete="off" name="affiliation" id="form_affiliation" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field type="text" className="field_text" placeholder="Email address*" autoComplete="off" name="email" id="form_email" />
                                                <p className="validation_error"><ErrorMessage name="email" /></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field type="text" className="field_text" placeholder="Telephone" autoComplete="off" name="phone" id="form_phone" />
                                                
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <Field component="select" className="field_text" name="inquiry" id="form_inquiry">
                                                    <option value="" disabled>Type of Inquiry*</option>
                                                    <option value="Branding">Branding</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Photography">Photography</option>
                                                    <option value="Motion">Motion</option>
                                                </Field>
                                                <p className="validation_error"><ErrorMessage name="inquiry" /></p>
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="field_text_wrapper">
                                                <Field component="textarea" type="text" className="field_text" placeholder="How can we help?*" autoComplete="off" name="comment" id="form_comment"></Field>
                                                <p className="validation_error"><ErrorMessage name="comment" /></p>
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="submit" value="Let's Create!" className="field_submit" />
                                        </div>
                                    </div>

                                </Form>
                            </Formik>
                        </div>
                    </div>
                    {
                        successState ? (
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="successmsg">Thank you for your message. It has been sent.</p>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </FormSection>
    );
}*/


const EnquiryForm = (props) => {
    const propsSubHead = props.subhead;
    const propsBtnText = props.btnText;
    const propsHeading = props.heading;
    
    const [formValues, setFormValues] = useState({
        fname: "",
        lname: "",
        affiliation: "",
        email: "",
        phone: "",
        inquiry: "",
        comment: "",
    });

    const [formErrors, setFormErrors] = useState({});
    const [successState, setSuccessState] = useState(false);
    const [tokenData, setTokenData] = useState(null);

    /*
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/wp-json/jwt-auth/v1/token`, {
            username: process.env.REACT_APP_admin_username,
            password: process.env.REACT_APP_admin_password,
        })
        .then(response => setTokenData(response.data.token))
        .catch(error => console.log(error));
    }, []);
    */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: process.env.REACT_APP_admin_username,
                password: process.env.REACT_APP_admin_password,
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setTokenData(data.token))
        .catch(error => console.log(error));
    }, []);
    


    const validate = (values) => {
        const errors = {};
        // First Name
        if (!values.fname) {
            errors.fname = 'Please enter your first name';
        }
    
        // Last Name
        if (!values.lname) {
            errors.lname = 'Please enter your last name';
        }
    
        // Email
        if (!values.email) {
            errors.email = 'Please enter your email';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
    
        // Inquiry
        if (!values.inquiry) {
            errors.inquiry = 'Please select an option';
        }
    
        // Comment
        if (!values.comment) {
            errors.comment = 'Please enter your comment';
        }
    
        return errors;
    };
    
    /*
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0 && tokenData) {
            const config = {
                headers: { Authorization: `Bearer ${tokenData}` },
            };

            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/contact_data`, formValues, config);
                if (response.data === "sent") {
                    setSuccessState(true);
                    setFormValues({ fname: '', lname: '', email: '', inquiry: '', comment: '' }); // Reset form values
                } else {
                    // Handle server response other than "sent" here
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Submission error", error);
            }
        }
    };*/
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
    
        if (Object.keys(errors).length === 0 && tokenData) {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenData}`,
                },
                body: JSON.stringify(formValues),
            };
    
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/wp-json/my/v1/contact_data`, config);
                const data = await response.json();
                if (data === "sent") {
                    setSuccessState(true);
                    setFormValues({ fname: '', lname: '', affiliation: '', email: '', phone: '', inquiry: '', comment: '' }); // Reset form values
                } else {
                    // Handle server response other than "sent" here
                    console.log(data);
                }
            } catch (error) {
                console.error("Submission error", error);
            }
        }
    };
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues(prevFormValues => ({
            ...prevFormValues,
            [name]: value,
        }));
    
        // Optionally, you can re-validate the form on each change to provide immediate feedback
        // Comment out if you prefer validation only on submission
        const updatedValues = { ...formValues, [name]: value };
        setFormErrors(validate(updatedValues));
    };
    

    return (
        <section className="m-b-140">
            <div className="form-section">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2 dangerouslySetInnerHTML={{ __html: propsHeading }}></h2>
                            <h4 className="mb-5"><strong style={{fontFamily: 'OpenSans-ExtraBold'}}>{propsSubHead}</strong></h4>
                        </div>
                    </div>

                    {successState ? (
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="successmsg">Thank you for your message. It has been sent.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="row">
                            <div className="col-sm-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    value={formValues.fname}
                                                    onChange={handleChange}
                                                    placeholder="First Name*"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_fname"
                                                />
                                                {formErrors.fname && <p className="validation_error">{formErrors.fname}</p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">                                        
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    value={formValues.lname}
                                                    onChange={handleChange}
                                                    placeholder="Last Name*"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_lname"
                                                />
                                                {formErrors.lname && <p className="validation_error">{formErrors.lname}</p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">                                        
                                                <input
                                                    type="text"
                                                    name="affiliation"
                                                    value={formValues.affiliation}
                                                    onChange={handleChange}
                                                    placeholder="Company/affiliation"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_affiliation"
                                                />
                                                {/* {formErrors.affiliation && <p className="validation_error">{formErrors.affiliation}</p>} */}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formValues.email}
                                                    onChange={handleChange}
                                                    placeholder="Email Address*"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_email"
                                                />
                                                {formErrors.email && <p className="validation_error">{formErrors.email}</p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">                          
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={formValues.phone}
                                                    onChange={handleChange}
                                                    placeholder="Telephone"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_phone"
                                                />
                                                {/* {formErrors.phone && <p className="validation_error">{formErrors.phone}</p>} */}
                                            </div>
                                        </div>

                                        <div className="col-sm-6">
                                            <div className="field_text_wrapper">
                                                <select
                                                    name="inquiry"
                                                    value={formValues.inquiry}
                                                    onChange={handleChange}
                                                    className="field_text"
                                                    id="form_inquiry"
                                                >
                                                    <option value="">Type of Inquiry*</option>
                                                    <option value="Branding">Branding</option>
                                                    <option value="Design">Design</option>
                                                    <option value="Photography">Photography</option>
                                                    <option value="Motion">Motion</option>
                                                </select>
                                                {formErrors.inquiry && <p className="validation_error">{formErrors.inquiry}</p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="field_text_wrapper">
                                                <textarea
                                                    name="comment"
                                                    value={formValues.comment}
                                                    onChange={handleChange}
                                                    placeholder="How can we help? *"
                                                    className="field_text"
                                                    autoComplete="off"
                                                    id="form_comment"
                                                ></textarea>
                                                {formErrors.comment && <p className="validation_error">{formErrors.comment}</p>}
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <input type="submit" value={propsBtnText} className="field_submit" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};


export default EnquiryForm;