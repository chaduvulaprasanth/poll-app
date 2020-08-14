module SessionsHelper

  def log_in(user)
    session[:user_id] = user.id
  end

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  def logged_in?
    !current_user.nil?
  end

  def logout
    session.delete(:user_id)
    current_user = nil
  end

  def required_user
    if !logged_in?
      flash[:alert] = 'you must be logged user'
      redirect_to login_path
    end
  end
end
