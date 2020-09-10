var crypto = require('crypto'); // TODO: install this in server directory, "npm install crypto-js"
var nodeMailer = require('nodemailer'); // TODO: install this in server directory, "npm install nodemailer"

exports.register = function(req, res, next) {
    req.assert('username', 'Username cannot be blank').notEmpty();
    req.assert('password', 'Password must be longer than 6 and less than 12 characters.').minlength(6);
    req.assert('password', 'Password must be longer than 6 and less than 12 characters.').maxlength(12);
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('email', 'Email is invalid.').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.sanitize('email').normalize({
        gmail_remove_dots: false
    });

    var errors = req.validationErrors();
    if (errors) { 
        return res.status(400).send(errors);
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if (user) {
            return res.status(400).json({message: `The email ${req.body.email} is already registered.`});
        }

        user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }).save(function(err) {
            if (err) {
                return res.status(500).json({message: `Please send this error to the dev team: ${err.message}`});
            }

            var authToken = new Token({
                _id: user.id, 
                token: crypto.randomBytes(16).toString('hex')
            });

            authToken.save(function(err) {
                if (err) {
                    return res.status(500).json({message: `Please send this error to the dev team: ${err.message}`});
                }

                var mailer = nodeMailer.createTransport({
                    service: 'Sendgrid',
                    auth: {
                        user: process.env.SENDGRID_USERNAME,
                        pass: process.env.SENDGRID_PASSWORD
                    }
                });

                var mailOptions = {
                    from: 'no-reply@pubcrawl.se',
                    to: user.email,
                    subject: 'Verify your account',
                    text: 'Hello from PubCrawl!\nPlease click the following link to verify your account: http:\/\/' + req.headers.host + '\/confirmation\/' + authToken.token + '\n'
                };

                mailer.sendMail(mailOptions, function (err) { 
                    if (err) {
                        return res.status(500).json({message: `Please send this error to the dev team: ${err.message}`});
                    }
                    res.status(200).json({message: `Validation email sent to ${user.email}`});
                });
            });
        });
    });
};

exports.login = function(req, res, next) {
    req.assert('email', 'Email is invalid.').isEmail();
    req.assert('email', 'Email cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notE9mpty();
    req.sanitize('email').normalize({
        gmail_remove_dots: false
    });

    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    User.findOne( {email: req.body.email }, function(err, user) {
        if (!user) return res.status(401).json({message:err.message});
    })
}


