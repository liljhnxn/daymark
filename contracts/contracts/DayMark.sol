// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DayMark
 * @notice An on-chain daily check-in smart contract for Botchain.
 * Users can record their daily check-in once per UTC calendar day.
 */
contract DayMark {
    // Mapping from user address to the UTC day index (block.timestamp / 1 days) of their last check-in
    mapping(address => uint256) public lastCheckInDay;

    // Mapping from user address to their latest check-in Unix timestamp
    mapping(address => uint256) public lastCheckInTimestamp;

    // Mapping from user address to their total check-in count
    mapping(address => uint256) public totalCheckIns;

    /**
     * @notice Emitted whenever a user successfully checks in
     * @param user The address of the user checking in
     * @param timestamp The block timestamp of the check-in
     * @param totalCheckIns The user's updated cumulative check-in count
     */
    event CheckedIn(
        address indexed user,
        uint256 timestamp,
        uint256 totalCheckIns
    );

    /**
     * @notice Records a daily check-in for the caller
     * Reverts if the caller has already checked in during the current UTC calendar day.
     */
    function checkIn() external {
        uint256 currentDay = block.timestamp / 1 days;

        require(
            lastCheckInDay[msg.sender] != currentDay,
            "DayMark: Already checked in today"
        );

        lastCheckInDay[msg.sender] = currentDay;
        lastCheckInTimestamp[msg.sender] = block.timestamp;
        totalCheckIns[msg.sender] += 1;

        emit CheckedIn(msg.sender, block.timestamp, totalCheckIns[msg.sender]);
    }

    /**
     * @notice Checks whether a given address has checked in during the current UTC day
     * @param user The address to inspect
     * @return True if the user has already checked in today (UTC), false otherwise
     */
    function hasCheckedInToday(address user) external view returns (bool) {
        if (totalCheckIns[user] == 0) {
            return false;
        }
        uint256 currentDay = block.timestamp / 1 days;
        return lastCheckInDay[user] == currentDay;
    }

    /**
     * @notice Retrieves check-in information for a given address
     * @param user The address to inspect
     * @return latestTimestamp The Unix timestamp of the user's most recent check-in
     * @return totalCount The cumulative number of check-ins by the user
     * @return checkedInToday True if the user has already checked in during the current UTC day
     */
    function getCheckInInfo(address user)
        external
        view
        returns (
            uint256 latestTimestamp,
            uint256 totalCount,
            bool checkedInToday
        )
    {
        uint256 currentDay = block.timestamp / 1 days;
        bool isToday = (totalCheckIns[user] > 0) && (lastCheckInDay[user] == currentDay);
        return (lastCheckInTimestamp[user], totalCheckIns[user], isToday);
    }
}
