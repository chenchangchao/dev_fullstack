# dev_fullstack
## bug fixed
* Q:PS D:\workdir\nodedev\github\dev_nestjs> git add .
error: 'lesson1/backend/' does not have a commit checked out
fatal: adding files failed
* A:create `lesson1\backend` directory in remote repo,and git clone it,then repeat the push process. 
# git operation
```sh
# Initial config
git config --global user.name "dustin.chen"
git config --global user.email "648023262@qq.com"
git config --global color.ui auto

# set SSH Key
ssh-keygen -t rsa -C "648023262@qq.com"
cat ~/.ssh/id_rsa.pub # add SSH Key

# push to remote repo
git clone https://github.com/DustinCChen/dev_nestjs.git
cd dev_nestjs/
git add .
git commit -m "my first commit"
git push -u origin main
# sync remote repo update to local repo
git remote add origin https://github.com/DustinCChen/dev_nestjs.git
git pull origin main
git status
git checkout -- .

```

## next-auth
```bash
# echo 'export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"' >> ~/.bash_profile
echo 'export PATH="/Applications/Visual Studio Code.app/Contents/Resources/app/bin:$PATH"' >> ~/.zshrc ## vscode 添加到path环境变量
source ~/.zshrc


bun upgrade
bun create next-app@latest
bun run dev
# "dev": "next dev --turbopack --experimental-https",
# bun dev https://localhost:3000
bun add next-auth@beta # beta version5.0.0
git init 
git status

```

## next-auth VS auth.js

- next-auth: https://next-auth.js.org/getting-started/examples
- auth.js: https://authjs.dev/getting-started/examples
- a framework-agnostic solution, Auth.js might be a better fit.
- Auth.js is a more lightweight and flexible solution compared to NextAuth.js, which is built specifically for Next.js.
- https://authjs.dev/getting-started/migrating-to-v5 next-auth融合auth.js

## docker shipment
```sh 
# wsl install 
# https://github.com/tech-shrimp/docker_installer
docker login --username=面对命中注定的失败 crpi-njrz39fcetreg0oy.cn-shanghai.personal.cr.aliyuncs.com
docker pull crpi-njrz39fcetreg0oy.cn-shanghai.personal.cr.aliyuncs.com/born_to_lose/my_docker_image:latest
docker images
# https://cr.console.aliyun.com/repository/cn-shanghai/born_to_lose/my_docker_image/details
wsl -l -v
wsl -d Ubuntu
curl https://registry-1.docker.io/v2/ #测试网络连接
sudo systemctl restart docker ## 重启docker
docker pull dpage/pgadmin4 # 手动拉取镜像
sudo systemctl status docker # 查看docker状态
#  配置镜像加速器
docker --version
sudo apt-get update
sudo apt-get install docker.io
sudo systemctl start docker
sudo systemctl daemon-reload
sudo systemctl enable docker
sudo systemctl start docker
ls /lib/systemd/system | grep docker
docker-compose up -d
docker-compose down
 
openssl rand -base64 33 ## 生成token

ps aux|grep docker
docker info

docker --version
open /Applications/Docker.app ## 启动docker
docker ps  -a 
docker run -d --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 postgres
docker compose up -d
docker ps 
```
