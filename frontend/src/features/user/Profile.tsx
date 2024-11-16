import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/store";

const Profile = () => {
  const user = useAppSelector((state) => state.user.user); // Access user info from Redux store
  // const token = useAppSelector((state) => state.user.token);

  console.log("user", user);
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex px-12">
      <div className=" space-y-3 px-6 w-2/3">
        <h2 className=" text-2xl">User Information</h2>
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar || "/src/assets/boy.png"}
            className="w-24 h-24 rounded-full"
            alt="Profile Picture"
          />

          <div className="space-x-3">
            <div className="relative inline-block">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="bg-[#0F172A]   text-white font-bold py-2 px-4 rounded">
                Upload New
              </button>
            </div>

            {/* <Button>
              <input
                type="file"
                name="uploadNew"
                id="uploadNew"
                className=" bg-transparent bg-black"
              />
              Upload New
            </Button> */}
            <Button variant="outline">Delete Avatar</Button>
          </div>
        </div>

        <div className="flex space-x-6 ">
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="username">Username: </label>
            <Input
              placeholder="Username"
              className="w-full"
              defaultValue={user.username}
            />
          </div>
          <div className="flex flex-col space-y-1 w-full">
            <label htmlFor="email">Email: </label>
            <Input
              placeholder="Email"
              className="w-full"
              defaultValue={user.email}
            />
          </div>
        </div>

        <Button>Update Profile</Button>
      </div>
      <div className="bg-[#9e5b5b] w-1/3">
        <h2>Messages</h2>
      </div>
    </div>
  );
};

export default Profile;
