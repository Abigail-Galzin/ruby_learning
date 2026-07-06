class UserMailer < ApplicationMailer
  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.welcome.subject
  #

  default from: 'notifications@example.com'

  def welcome(user)
    @greeting = "Hi"
    @user = user
    @url = 'http://example.com/login'

    mail to: @user.email
    #mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
