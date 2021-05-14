// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract CampaignFactory{
    struct CampaignData{
        string title;
        string description;
        uint minimumContribution;
        address manager;
        address camapaignAddress;
    }
    CampaignData[] public deployedCampaigns;
    
    function createCampaign(string memory title,string memory desc,uint min) public {
      Campaign newCampaign = new Campaign(title,desc,min,msg.sender);
      deployedCampaigns.push(CampaignData(title,desc,min,msg.sender,address(newCampaign)));
    }
    
    function getDeployedCampaigns() public view returns(CampaignData[] memory){
        return deployedCampaigns;
    }
}

contract Campaign {
    
    struct Request{
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address public manager;
    uint public minimumContribution;
    string public title;
    string public description;
    mapping(address => bool) public approvers;
    uint public numApprovers;
    
    Request[] public requests;
    uint public numRequest;
    
    constructor(string memory name,string memory desc,uint min,address creator){
        title = name;
        description = desc;
        manager = creator;
        minimumContribution = min;
        numRequest = 0;
        numApprovers = 0;
    }
    
    modifier isManager {
        require(msg.sender == manager);
        _;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        numApprovers++;
    }
    
    function createRequest(string memory req_desc,uint cost,address recipient) public isManager {
        requests.push();
        Request storage newRequest = requests[numRequest];
        numRequest++;
       
        newRequest.description = req_desc;
        newRequest.value = cost;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
             
    }
    
    function approveRequest(uint requestIndex) public{
        //Check if sender is approver
        require(approvers[msg.sender]);
        
        Request storage request = requests[requestIndex];
        
        //Check if approver has not alreay approved
        require(!request.approvals[msg.sender]);
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        
    }
    
    function finalizeRequest(uint reqIndex) public payable isManager{
        Request storage request = requests[reqIndex];
        
        //Check if request is already approved
        require(!request.complete);
        
        //Check if approval count is greater than 50% of approvers count
        require(request.approvalCount >= (numApprovers/2));
        
        //Send money to recipient and Set request to complete
        address payable recipient = payable(request.recipient);
        recipient.transfer(request.value);
        request.complete = true;
    }
    
    function getCamapaignData() public view returns (string memory,string memory,address,uint,uint,uint,uint){
        
        return (title, description, manager, minimumContribution, address(this).balance, requests.length, numApprovers);
        
    }

    function getRequestLength() public view returns(uint){
        return requests.length;
    }
    
}

    
    
