const passport = require('passport')
const passportJWT = require('passport-jwt')
const ExtractJwt = passportJWT.ExtractJwt
const StrategyJwt = passportJWT.Strategy
const {User} = require('../models')

const secret = "+gbr=Yoh^K,a>[Ec@!7ps}Qr6-|<~-VOBM|:prAej,P4y+Re+,=B5W@lhmGv^=&l"


// passport.use(
// 	new StrategyJWT(
// 		{
// 			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// 			secretOrKey: secret
// 		},
// 		function (jwtPayload, done) {
// 			return User.findOne( {where: { id: jwtPayload.id }} )
// 				.then((user) => {
// 					return done(null, user)
// 				})
// 				.catch((err) => {
// 					return done(err)
// 				})
// 		}
// 	)
// )

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);