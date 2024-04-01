const childModel = require("./../Model/childModel");

exports.getAllChildren = (req, res, next) => {
    try {
        childModel
            .find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ message: error + "" });
            });
    } catch (error) {
        res.status(500).json({ message: error + "" });
    }
};
//find one
exports.getChildById = (req, res, next) => {
    try {
        const id = req.params.id;
        childModel
            .findById(id)
            .then((data) => {
                if (data) {
                    res.status(200).json({ data });
                } else {
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error + "" });
            });
    } catch (error) {
        res.status(500).json({ message: error + "" });
    }
};
exports.createChild = async (req, res, next) => {
    try {
        await childModel
            .create(req.body)
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ message: error + "" });
            });
    } catch (error) {
        res.status(500).json({ message: error + "" });
    }
};

exports.updateChild = async (req, res, next) => {
    try {
        await childModel.findByIdAndUpdate({ _id: req.body.id }, req.body).then((data) => {
            if(data){
                res.status(200).json({ data });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        }).catch((error) => {
            res.status(500).json({ message: error + "" });
        });
    } catch (error) {
        res.status(500).json({ message: error + "" });
    }
};

exports.deleteChild = (req, res, next) => {
    try {
        
        childModel
            .findByIdAndDelete({ _id: req.body.id })
            .then((data) => {
                if(data){
                    res.status(200).json({ data });
                }
                else{
                    res.status(404).json({ message: "User not found" });
                }
            })
            .catch((error) => {
                res.status(500).json({ message: error + "" });
            });
    } catch (error) {
        res.status(500).json({ message: error + "" });
    }
};
