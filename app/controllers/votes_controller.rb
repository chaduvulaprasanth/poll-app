class VotesController < ApplicationController

  before_action :required_user, only: [:create]

  def create
    @polling = Polling.find(params[:vote][:polling_id])
    if @polling
      unless check_my_vote(@polling)
        @polling.votes.create(user_id: current_user.id)
        @option =  @polling.options.find(params[:vote][:option_id])
        @option.update(vote_count: @option.vote_count + 1)
      end
      render status: :ok, json: {notice: "voted successfully"}
    else 
      render status: :unprocessable_entity, json: {notice: "No poll found"}
    end
  end

  private 
  def check_my_vote(polling)
    polling.voter_ids.include?(current_user.id)
  end

end
