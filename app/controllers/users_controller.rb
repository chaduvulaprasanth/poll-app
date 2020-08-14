class UsersController < ApplicationController
  
  def new 
    render
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      render status: :ok, json: {notice: "Account created Successfully" }
    else
      render status: :unprocessable_entity, json: {errors: @user.errors.full_messages}
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
