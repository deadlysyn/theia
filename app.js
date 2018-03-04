/*
 * Theia server
 */

var express         = require('express'),
    app             = express(),
    request         = require('request'),
    bp              = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    passport        = require('passport'),
    methodOverride  = require('method-override'),
    LocalStrategy   = require('passport-local'),
    User            = require('./models/user');
    // Host = require('./models/host'),
    // Package = require('./models/package');

// import route handlers
var indexRoutes         = require('./routes/index');
    // apiRoutes           = require('./routes/api'),
    // adminRoutes         = require('./routes/admin');

// environment config
var ip              = process.env.IP || '127.0.0.1',
    port            = parseInt(process.env.PORT, 10) || 3000,
    dbURL           = process.env.DBURL || 'mongodb://127.0.0.1/theia',
    passportSecret  = process.env.SECRET || "Some random long string you'd never put in version control.";

mongoose.connect(dbURL, {useMongoClient: true});

// uncomment to drop and re-populate DB with test data on each run
var seedDB = require('./seedDB');
seedDB();

app.set('view engine', 'ejs');
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
// flash messages; must come before passport config
app.use(flash());

// passport configuration
app.use(require('express-session')({
    secret: passportSecret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// make objects available in all views/templates
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/', indexRoutes);
// app.use('/api', apiRoutes);
// app.use('/admin', adminRoutes);

app.listen(port, ip, function() {
    console.log('Server listening on ' + ip + ':' + port + '...');
    console.log('DBURL:' + dbURL);
    console.log('SECRET:' + passportSecret.substring(0,10) + '...');
});
