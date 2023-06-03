export default function Error({ message }: { message: string }) {
	return (
		<div className="col-span-full flex flex-row rounded-lg">
			<p className="w-24 h-20 flex justify-center items-center bg-blue-400 uppercase rounded-l-lg font-semibold">
				Error
			</p>
			<p className="w-[calc(100%-200px)] h-20 flex justify-center items-center text-center ">
				{message}
			</p>
		</div>
	);
}
