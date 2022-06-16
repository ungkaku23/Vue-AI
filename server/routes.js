//CONFIG FILE FOR ALL OUR ROUTES

//Import All Routes To registerRoutes Function

const authRoutes = require('./api/auth/auth-routes');
const regRoutes = require('./api/register/register-routes');
const userRoutes = require('./api/user/user-routes');
const teamRoutes = require('./api/team/team-routes');
const invitationRoutes = require('./api/invitation/invitation-routes');
const mailRoutes = require('./api/mail/mailling-routes');
const accountRoutes = require('./api/account/account-routes');
const subscriptionRoutes = require('./api/subscription/subscription-routes');
const stripeRoutes = require('./api/subscription/subscription-webhook');
const documentRoutes = require('./api/document/document-routes');
const articleRoutes = require('./api/article/article-routes');
const notesRoutes = require('./api/note/note-routes');
const projectRoutes = require('./api/project/project-routes');
const dashboardRoutes = require('./api/dashboard/dashboard-routes');
const oauthRoutes = require('./api/auth/oauth-routes');
const fileRoutes = require('./api/file/file-routes');
const shareRoutes = require('./api/share/share-routes');

//For All Our Routes We Use "/api" Prefix (any route gonna have /api before)
function registerRoutes(app) {
  app.use('/api', authRoutes);
  app.use('/api', regRoutes);
  app.use('/api', userRoutes);
  app.use('/api', teamRoutes);
  app.use('/api', invitationRoutes);
  app.use('/api', mailRoutes);
  app.use('/api', accountRoutes);
  app.use('/api', subscriptionRoutes);
  app.use('/api', stripeRoutes);
  app.use('/api', documentRoutes);
  app.use('/api', articleRoutes);
  app.use('/api', notesRoutes);
  app.use('/api', projectRoutes);
  app.use('/api', dashboardRoutes);
  app.use('/', oauthRoutes);
  app.use('/api', fileRoutes);
  app.use('/api', shareRoutes);
}

module.exports.registerRoutes = registerRoutes;
