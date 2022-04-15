const employees = require('./../models/employees');

exports.uploadEmployeeCSV = (req,res,next) => {
    const employeeCSVData = req.body.employee_csv_data;
    let flag = false;
    let error = undefined;
    employeeCSVData.forEach((employee) => {
        if(!flag) {
            employees.findOne({login: employee.login}).then((data) => {
                if((data === null || data === undefined) || 
                (data !== null && data !== undefined && data.id === employee.id)) {
                    employees.findOne({id: employee.id}).then((data) => {
                        if(data !== null && data !== undefined) {
                            employees.updateOne({id: employee.id}, {$set: {id: employee.id, name: employee.name,
                                login: employee.login, salary: employee.salary}}, {new: true}).then((data) => {

                                }).catch((err) => {
                                    error = err;
                                    flag = true; 
                                });
                        } else {
                            const employeeData = new employees(employee);
                            employeeData.save().then(() => {
        
                            }).catch((err) => {
                                error = err;
                                flag = true; 
                            }); 
                        }

                    }).catch((err) => {
                        error = err;
                        flag = true; 
                    });
                }
            
            }).catch((err) => {
                console.log(err);  
                error = err;
                flag = true; 
            });
            
        } else {
            res.status(400).json({message: "Upload Already Exists"});   
        } 
    });
    if(!flag) {
        res.status(201).json({message: "Successfully Uploaded Users"});  
    } else {
        res.status(400).json({message: "Upload Already Exists"});  
    }
}

exports.getEmployees = (req,res,next) => {
    employees.find({}).then((employeeData) => {
        res.status(200).json({message: employeeData})
    }).catch((error) => {
        res.status(400).json({message: error.message});    
    }); 
}

exports.updateEmployee = (req,res,next) => {
    employees.findOne({login: req.body.employee_login}).then((data) => {
        if((data === null || data === undefined) || 
        (data !== null && data !== undefined && data.id === req.body.employee_id)) {
            employees.findOneAndUpdate({id: req.params.id}, {$set: {id: req.body.employee_id, name: req.body.employee_name,
                login: req.body.employee_login, salary: req.body.employee_salary}}, {new: true}).then((employeeData) => {
                res.status(204).json({message: employeeData})
            }).catch((error) => {
                res.status(400).json({message: error.message});    
            });
        } else {
            res.status(400).json({message: "Sorry Login Already Exists"}); 
        }
    }).catch((error) => {
        res.status(400).json({message: error.message});    
    });
}

exports.deleteEmployee = (req,res,next) => {
    employees.findOneAndDelete({id: req.params.id}).then((employeeData) => {
        res.status(204).json({message: employeeData})
    }).catch((error) => {
        res.status(400).json({message: error.message});    
    }); 
}



