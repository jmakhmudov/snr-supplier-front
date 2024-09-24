"use client"

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Status, { StatusType } from "../ui/Status";
import { updateOrderStatus } from "@/utils/api/orders";

interface StatusSelect {
  orderId: number;
  status: StatusType;
}

const statuses: StatusType[] = ["pending", "shipped", "delivered", "cancelled"]

export default function StatusSelect({
  orderId,
  status
}: StatusSelect) {
  const [activeStatus, setActiveStatus] = useState(status);

  const handleStatusSelect = async (selectedStatus: StatusType) => {
    const updatedStatus = await updateOrderStatus(orderId, selectedStatus)
    console.log(updatedStatus)
    if (updatedStatus === selectedStatus) setActiveStatus(selectedStatus);
  }

  return (
    <div className="min-w-24">
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          <Status label={activeStatus} />
        </PopoverTrigger>
        <PopoverContent className="w-40 space-y-2">
          {
            statuses.map(s => (
              <div
                key={s}
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleStatusSelect(s)}
              >
                <div
                  data-isActive={activeStatus === s}
                  className="w-2 h-2 bg-white rounded-full data-[isActive=true]:bg-gray-normal"
                ></div>
                <Status label={s} />
              </div>
            ))
          }
        </PopoverContent>
      </Popover>
    </div>
  )
}