class PollingsController < ApplicationController
  before_action :required_user, except: [:index]

  def index
    @pollings = Polling.all
  end

  def new 
    render
  end 

  def create
    @polling = Polling.new(polling_params)
    if @polling.save
      render status: :ok, json: {notice: @polling}
    else
      render status: :unprocessable_entity, json: {errors: @polling.errors.full_messages}
    end
  end

  private

  def polling_params
    params.require(:polling).permit(:question, options_attributes: [:name] )
  end
end
