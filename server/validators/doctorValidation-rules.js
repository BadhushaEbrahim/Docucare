import{body,validationResult} from 'express-validator'

const DoctorRegisterRules=[
    body("fullName").notEmpty().withMessage("DoctorName is required").trim(),
    body("email").notEmpty().withMessage("Email is required").trim(),
    body("password")
    .isStrongPassword ({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    })
    .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"),
    body('dob').notEmpty().withMessage("Date of birth must be added"),
    body("experience").notEmpty().withMessage("experience is required"),
    body("MedicalregisterNo").notEmpty().withMessage("MedicalregisterNo is required"),
    body("specialization").notEmpty().withMessage("Dob is required"),
     //Input validation and santization
     (req, res, next) => {
        const validationErrors = validationResult(req);
        if (!validationErrors.isEmpty()) {
          console.log(validationErrors.array()); // Log validation errors
          const errorMessages = validationErrors.array().map(error => error.msg);
          return res.status(400).json({ errors: errorMessages });
        }
        next();
      }
    
]
const DocterLoginValidationRules=[
    body("email").notEmpty().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("password is required"),
 //Input validation and santization
 (req,res,next)=>{
    const validationErrors=validationResult(req)
    const errorMessages = validationErrors.array().map(error => error.msg);

    if(!validationErrors.isEmpty()){
        return res.status(404).json({errors:errorMessages})
    }
    next();
 },
 
];

export {DocterLoginValidationRules,DoctorRegisterRules}





