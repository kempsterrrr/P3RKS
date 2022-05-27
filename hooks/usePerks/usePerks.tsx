//@ts-nocheck
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getPerks, incrementPerkView } from "../../services/PerksService";

export const useGetPerks = () => {
  return useQuery("perks", getPerks);
};

export const useIncrementPerkView = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ perkId, views }) => incrementPerkView({ perkId, views }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("perks");
      },
    }
  );
};
