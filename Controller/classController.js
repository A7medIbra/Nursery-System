const teacherModel = require('../Model/teacherModel');
const ClassModel = require('../Model/classModel');
const classModel = require('../Model/classModel');

exports.getAllClasses = (req, res, next) => {
    try {
        ClassModel.find().then((data) => {
            res.status(200).json({ data });
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}
exports.getClassById = (req, res, next) => {
    try {
        const id = req.params.id;
        classModel.findOne({ class_id: id }).then((data) => {
            if (data) {
                res.status(200).json({ data });
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}
exports.createClass = async (req, res, next) => {
    try {
        await ClassModel.create(req.body).then((data) => {
            res.status(201).json({ data });
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}
exports.updateClass = async (req, res, next) => {
    try {
        await ClassModel.findOneAndUpdate({ class_id: req.body.id }, req.body).then((data) => {
            if(data){
                res.status(200).json({ data });
            }
            else{
                res.status(404).json({ message: "Class not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}
exports.deleteClass = (req, res, next) => {

    try {
        const id = req.body.id;
        classModel.findOneAndDelete({ class_id: id }).then((data) => {
            if (data) {
                res.status(200).json({ data });
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }

}
exports.getChild = (req, res, next) => {
    try {
        const id = req.params.id;
        ClassModel.findById(id).then((data) => {
            if (data) {
                res.status(200).json({ data });
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: error + '' });
        });
    }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}
exports.getSupervisor = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await ClassModel.findOne({ _id: id });
        if (data) {
            const supervisor = data.supervisor;
            const teacher = await teacherModel.findOne({ teacher_id: supervisor });
            if (teacher) {
                res.status(200).json({ teacher });
            } else {
                res.status(404).json({ message: "Class not found" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    }
    // try {
    //     const id = req.params.id;
    //     teacherModel.findOne(id).then((data) => {
    //         console.log(data+"data");
    //         if (data) {
    //             console.log(data+"data");
    //             const supervisor = data.supervisor;
    //             console.log(supervisor+"supervisor");
    //             try {
    //                 teacherModel.findById(supervisor).then((data) => {
    //                     if (data) {
    //                         res.status(200).json({ data });
    //                     } else {
    //                         res.status(404).json({ message: "User not found" });
    //                     }
    //                 }).catch((error) => {
    //                     res.status(500).json({ message: error + '' });
    //                 });
    //             }
    //             catch (error) {
    //                 res.status(500).json({ message: error + '' });
    //             }
    //         } else {
    //             res.status(404).json({ message: "User not found" });
    //         }
    //     }).catch((error) => {
    //         res.status(500).json({ message: error + '' });
    //     });
    // }
    catch (error) {
        res.status(500).json({ message: error + '' });
    }
}

