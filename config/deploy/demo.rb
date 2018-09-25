set :stage, :demo

server "101.201.113.59", user: "ubuntu", roles: %w{web app db}
set :branch, ENV["REVISION"] || ENV["BRANCH_NAME"] || "master"
set :database_path, "deploy/"
set :deploy_user, 'ubuntu'
set :use_sudo,false
