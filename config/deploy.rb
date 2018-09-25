# config valid only for current version of Capistrano
lock '3.4.1'

set :application, 'fuxiong'
set :app, 'company'
#set :repo_url, 'git@git.oschina.net:myjacksun/fuxiong_admin.git'

set :linked_dirs, %w{public/company }

namespace :deploy do
  task :build do
    on roles(:all) do
      #copy api config
      run_locally do
        execute "cp src/config/api.js tmp/api.js"
        execute "cp src/config/api.js.#{fetch(:stage)} src/config/api.js"
      end
      run_locally do
        execute "npm run build"
        execute "cd dist && tar -jcf #{fetch(:app)}.tar.bz2  --exclude=#{fetch(:app)}.tar.bz2 ."
        #恢复自己的api.js
        execute "mv tmp/api.js src/config/api.js"
      end
      upload! "dist/#{fetch(:app)}.tar.bz2", "#{shared_path}/public", :via => :scp
      run_locally do
        execute "rm -rf dist"
      end
      execute "cd #{shared_path}/public &&   rm -rf #{fetch(:app)}"
      execute "cd #{shared_path}/public && mkdir -p #{fetch(:app)}  && tar -jxmf #{fetch(:app)}.tar.bz2 -C #{fetch(:app)}   && rm -rf #{fetch(:app)}.tar.bz2"
      execute "ln -sf  #{shared_path}/public/#{fetch(:app)} #{current_path}/public/#{fetch(:app)}"
      execute "sudo /etc/init.d/nginx reload"
    end
  end
end


