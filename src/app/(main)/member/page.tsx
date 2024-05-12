import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { SiFacebook, SiGithub, SiInstagram, SiTwitter } from "react-icons/si";

export default function MemberPage() {
  return (
    <div>
      <h2 className="text-bold mb-6">メンバー</h2>
      <div className="grid grid-cols-3">
        <Card>
          <div className="flex items-center flex-col gap-5 p-4">
            <div>
              <Image
                src={`https://api.dicebear.com/8.x/open-peeps/svg?seed=${Math.random()}`}
                alt="avatar"
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-lg font-bold">山田 太郎</h3>
              <p className="text-sm text-muted-foreground">デザイナー</p>
            </div>

            <div>
              <button className="text-sm text-primary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                minus natus aut ad placeat doloribus dicta magnam facilis
                temporibus exercitationem delectus, molestias autem, quisquam
                nulla laudantium voluptates aperiam perspiciatis recusandae.
              </button>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <SiTwitter className="text-xl text-primary" />
              <SiFacebook className="text-xl text-primary" />
              <SiGithub className="text-xl text-primary" />
              <SiInstagram className="text-xl text-primary" />
            </div>

            <div>
              <Button className="text-sm">プロフィール</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
