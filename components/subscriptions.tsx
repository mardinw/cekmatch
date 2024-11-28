
export const Subscription = () => {
    return (
        <div className="flex-grow p-4 md:overflow-y-auto md:p-8">
            <div className="border rounded-lg bg-gray-50 p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Informasi Langganan</h2>
                <p className="text-gray-700 mb-2">
                    <span className="font-medium">Nama Pengguna:</span>
                </p>
                <p className="text-gray-700 mb-2">
                    <span className="font-medium">Max. Upload:</span> 0
                </p>
                <div className="flex mt-4">
                    <span className="font-medium">Berlangganan:</span>
                    <span className="px-2 py-1 text-sm font-medium text-red-600">
                        Tidak Aktif
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                    Perbarui langganan Anda untuk meningkatkan kapasitas upload.
                </p>
            </div>
        </div>
    );
};
