json.pollings @pollings do|polling|
  json.options polling.options
  json.polling polling
  json.voter_ids polling.voter_ids
  json.current_user current_user
  json.logged_in logged_in?
  json.total_votes polling.votes.count
end